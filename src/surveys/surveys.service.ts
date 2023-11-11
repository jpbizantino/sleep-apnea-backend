import { Injectable, StreamableFile } from '@nestjs/common';
import { Question } from '@prisma/client';
import { differenceInYears, format } from 'date-fns';
import { ParameterName } from '../common/enums/parameter.enum';
import { ProcessingRule } from '../common/enums/rule.enum';
import { truncateString } from '../common/utils/string.utils';
import { EmailService } from '../mailer/email.service';
import { QuestionEntity } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';
import { utils, write } from 'xlsx';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ResultDto } from './dto/result.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { AnswerEntity } from './entities/answer.entity';

@Injectable()
export class SurveysService {
  constructor(
    private prisma: PrismaService,
    private questionService: QuestionsService,
    private emailService: EmailService,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    return this.prisma.survey.create({
      data: {
        patientId: createSurveyDto.patientId,
        answers: createSurveyDto.answers,
      },
    });
  }

  async findAll() {
    return await this.prisma.survey.findMany({
      include: { patient: true },
    });
  }

  async findOne(surveyId: string) {
    return await this.prisma.survey.findUnique({
      where: { surveyId },
      include: { patient: true },
    });
  }

  async update(id: string, updateSurveyDto: UpdateSurveyDto) {
    return await this.prisma.survey.update({
      where: { surveyId: id },
      data: updateSurveyDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { userId: id } });
  }

  interpretResult = async (calculatedScore: number): Promise<ResultDto> => {
    let desitionScore = 0;

    // Get score
    await this.prisma.parameter
      .findUnique({ where: { name: ParameterName.DESITION_SCORE } })
      .then((result) => (desitionScore = parseInt(result.value)));

    const positiveMessage =
      'Basado es sus respuestas, Ud. tiene MODERADA a ALTA probabilidad de padecer apnea obstructiva del sueño.';

    const negativeMessage =
      'Basado es sus respuestas, Ud. tiene BAJA probabilidad de padecer apnea obstructiva del sueño.';

    const resultDto: ResultDto = {
      positive: false,
      message: negativeMessage,
      recomendation:
        'Esta encuesta es orientativa. Siempre consulte a su médico.',
      score: 0,
    };

    // Return score result
    if (calculatedScore < desitionScore)
      return { ...resultDto, score: calculatedScore };
    else
      return {
        ...resultDto,
        positive: true,
        message: positiveMessage,
        score: calculatedScore,
      };
  };

  runAlgorithm = async (Id: string): Promise<number> => {
    let calculatedScore = 0;

    let ageGreaterThan = 0;
    let isMan = 'M';
    let bmiEqualOrGreateThan = 0;
    let bmiScore = 0;

    // Get all questions
    const questions: QuestionEntity[] = []; // await this.prisma.question.findMany();

    // Get Age for desition
    await this.prisma.parameter
      .findUnique({ where: { name: ParameterName.AGE_GREATER_THAN } })
      .then((result) => (ageGreaterThan = parseInt(result.value)));

    // Get Gender for desition
    await this.prisma.parameter
      .findUnique({ where: { name: ParameterName.IS_A_MAN } })
      .then((result) => (isMan = result.value));

    // Get Gender BMI for desition
    await this.prisma.parameter
      .findUnique({ where: { name: ParameterName.BMI_EQUAL_OR_GREATER_THAN } })
      .then((result) => (bmiEqualOrGreateThan = parseInt(result.value)));

    // Get BMI value
    await this.prisma.parameter
      .findUnique({ where: { name: ParameterName.BMI_SCORE } })
      .then((result) => (bmiScore = parseInt(result.value)));

    // Get survey results
    await this.prisma.survey
      .findUnique({ where: { surveyId: Id }, include: { patient: true } })
      .then((survey: any) => {
        //*******************************

        // Calculate age in years
        const ageInYears = differenceInYears(
          survey.createdAt,
          survey.patient.dateOfBirth,
        );

        // Score for Age
        if (ageInYears > ageGreaterThan) {
          calculatedScore++;
        }

        console.log(calculatedScore);
        //*******************************

        // Score is Man
        if (survey.patient.gender == isMan) calculatedScore++;

        console.log(calculatedScore);

        //*******************************

        //  Calculacte BMI

        const bmi =
          survey.patient.weight / Math.pow(survey.patient.height / 100, 2);

        if (bmi >= bmiEqualOrGreateThan)
          calculatedScore = calculatedScore + bmiScore;

        //*******************************

        survey.answers.forEach((item: AnswerEntity) => {
          // Cast selected values
          const selectedValue = item.selectedValue;

          // Find question
          const question = questions.find(
            (q) => q.questionId == item.questionId,
          );

          if (!question) return;

          if (this.isValueValid(selectedValue, question)) calculatedScore++;
        });
      });

    // Update Survey Score
    await this.prisma.survey.update({
      where: { surveyId: Id },
      data: { calculatedScore: calculatedScore },
    });

    return calculatedScore;
  };

  isValueValid = (selectedValue: number, question: QuestionEntity) => {
    let isValid = false;

    // Run comparer
    if (question.rule.processingRule == ProcessingRule.BETWEEN)
      isValid =
        selectedValue >= question.rule.valueA &&
        selectedValue <= question.rule.valueB;
    else if (question.rule.processingRule == ProcessingRule.GREATER_THAN)
      isValid = selectedValue > question.rule.valueA;
    else if (
      question.rule.processingRule == ProcessingRule.IQUAL_OR_GREATER_THAN
    )
      isValid = selectedValue >= question.rule.valueA;
    else if (question.rule.processingRule == ProcessingRule.LESS_THAN)
      isValid = selectedValue < question.rule.valueA;
    else if (question.rule.processingRule == ProcessingRule.IQUAL_OR_LESS_THAN)
      isValid = selectedValue <= question.rule.valueA;
    else if (question.rule.processingRule == ProcessingRule.DATA_AS_RECEIVED)
      isValid = selectedValue == question.rule.valueA;

    return isValid;
  };

  async getSurveysOnExcel(): Promise<StreamableFile> {
    //const ws = utils.aoa_to_sheet(['SheetJS'.split(''), [5, 4, 3, 3, 7, 9, 5]]);
    //const data = await this.findAll();

    const data = await this.transformDataForExcel();
    const ws = utils.json_to_sheet(data);

    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Encuestas');
    /* generate buffer */
    const buf = write(wb, { type: 'buffer', bookType: 'xlsx' });
    /* Return a streamable file */
    return new StreamableFile(buf);
  }

  async sendEmail(surveyId: string) {
    const survey = await this.findOne(surveyId);

    const result = await this.interpretResult(survey.calculatedScore);

    const emailBody = `
      
      
      <p><h3>${result.message}</h3>
      ${result.recomendation}      
      </p>
      
      <p>Fecha:<br>  <b>${format(survey.createdAt, 'dd/MM/yyyy HH:mm')}</b></p>
      <p>Paciente:<br>  <b>${survey.patient.lastName}, ${
        survey.patient.firstName
      }</b></p>
      <p>Fecha Nac.:<br>  <b>${format(
        survey.patient.dateOfBirth,
        'dd/MM/yyyy',
      )}</b></p>
      <p>Género:<br>  <b>${survey.patient.gender}</b></p>
      <p>Peso:<br>  <b>${survey.patient.weight} Kg.</b></p>
      <p>Altura:<br>  <b>${survey.patient.height} cm.</b></p>
      <p>Score:<br>  <b>${survey.calculatedScore}</b></p>    
    `;

    console.log(emailBody);
    await this.emailService.sendEmail([survey.patient.email], emailBody);
  }

  async transformDataForExcel() {
    // Get Data from the endpoint
    const data = await this.findAll();

    const result = [];

    data.map((survey) => {
      // Set Row
      const row = {};

      survey.answers.map((answer) => {
        const question = JSON.parse(answer.jsonQuestion) as Question;
        // if (!result[answer.questionId]) result[answer.questionId] = [];
        // result[answer.questionId].push(answer.selectedValue);

        // if (!row[answer.questionId])
        //   row[question.questionId] = answer.selectedValue;

        const column = truncateString(question.question, 30);

        if (!row[column]) row[column] = answer.selectedValue;
      });

      result.push({
        fecha: survey.createdAt,
        paciente: survey.patient.lastName + ', ' + survey.patient.firstName,
        score: survey.calculatedScore,
        ...row,
      });
    });

    console.log(result);
    return result;
  }

  async getExcelHeader() {
    const questions = await this.questionService.findAll();

    console.log(questions);
  }
}
