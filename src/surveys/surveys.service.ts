import { Injectable, StreamableFile } from '@nestjs/common';
import { Question } from '@prisma/client';
import { differenceInYears, format } from 'date-fns';
import { RuleEntity } from 'src/questions/entities/rule.entity';
import { utils, write } from 'xlsx';
import { ParameterName } from '../common/enums/parameter.enum';
import { ProcessingRule } from '../common/enums/rule.enum';
import { truncateString } from '../common/utils/string.utils';
import { EmailService } from '../mailer/email.service';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionEntity } from '../questions/entities/question.entity';
import { QuestionsService } from '../questions/questions.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ResultDto } from './dto/result.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { AnswerEntity } from './entities/answer.entity';
import {
  OperatorType,
  ScoreResult,
  SurveyResultSumary,
} from './types/survey.types';

@Injectable()
export class SurveysService {
  constructor(
    private prisma: PrismaService,
    private questionService: QuestionsService,
    private emailService: EmailService,
  ) {}

  async create(createSurveyDto: CreateSurveyDto) {
    return await this.prisma.survey.create({
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
    const resultArray: ScoreResult[] = [];
    const surveyResultSumary: SurveyResultSumary[] = [];

    // Get all questions
    // TODO:   Questions should come from the survey so dataset will not change
    const questions: QuestionEntity[] = await this.prisma.question.findMany({
      where: { active: true },
    });

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
      .then(async (survey: any) => {
        //*******************************

        // Calculate age in years
        const ageInYears = differenceInYears(
          survey.createdAt,
          survey.patient.dateOfBirth,
        );

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Edad',
          columnValue: ageInYears.toString(),
        });

        // Score for Age
        if (ageInYears > ageGreaterThan) {
          calculatedScore++;
        }

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Score Edad',
          columnValue: calculatedScore.toString(),
        });

        //*******************************

        console.log(
          'survey.patient.gender , isMan',
          survey.patient.gender,
          '  ',
          isMan,
        );
        // Score is Man
        if (survey.patient.gender == isMan) calculatedScore++;

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Género',
          columnValue: isMan ? 'M' : 'F',
        });

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Score Género',
          columnValue: isMan ? '1' : '0',
        });

        //*******************************

        //  Calculacte BMI

        const bmi =
          survey.patient.weight / Math.pow(survey.patient.height / 100, 2);

        if (bmi >= bmiEqualOrGreateThan)
          calculatedScore = calculatedScore + bmiScore;

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Altura',
          columnValue: survey.patient.height.toString(),
        });

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Peso (Kg)',
          columnValue: survey.patient.weight.toString(),
        });

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'IMC',
          columnValue: bmi.toString(),
        });

        // Add value to final result sumary
        surveyResultSumary.push({
          columnName: 'Score IMC',
          columnValue: bmi >= bmiEqualOrGreateThan ? bmiScore.toString() : '0',
        });
        //*******************************

        console.log('questions ', questions);

        survey.answers.forEach((item: AnswerEntity) => {
          // Cast selected values
          const selectedValue = item.selectedValue;

          // Find question
          const question = questions.find(
            (q) => q.questionId == item.questionId,
          );

          if (!question) return;

          const isValid = this.isValueValid(selectedValue, question.rule);

          if (question.rule.singleResult) {
            // Only add singleResult score
            if (isValid) {
              calculatedScore = calculatedScore + question.rule.scoreToAdd;
            }
          } else {
            // Add result to the array
            resultArray.push({
              questionId: question.questionId,
              isValid: isValid,
            });
          }

          // Add value to final result sumary
          surveyResultSumary.push({
            columnName: question.question,
            columnValue: selectedValue.toString(),
          });

          // Add value to final result sumary
          surveyResultSumary.push({
            columnName: `Score ${question.question}`,
            columnValue: isValid ? question.rule.scoreToAdd.toString() : '0',
          });
        });

        const totalCombinedFields = await this.calculateCombinedFields(
          resultArray,
          surveyResultSumary,
        );

        // Calc combines results
        calculatedScore = calculatedScore + totalCombinedFields;
      });

    console.log(surveyResultSumary);

    // Update Survey Score
    await this.prisma.survey.update({
      where: { surveyId: Id },
      data: {
        calculatedScore: calculatedScore,
        surveyResultSumary: surveyResultSumary,
      },
    });

    return calculatedScore;
  };

  isValueValid = (selectedValue: number, rule: RuleEntity) => {
    let isValid = false;

    // Run comparer
    if (rule.processingRule == ProcessingRule.BETWEEN)
      isValid = selectedValue >= rule.valueA && selectedValue <= rule.valueB;
    else if (rule.processingRule == ProcessingRule.GREATER_THAN)
      isValid = selectedValue > rule.valueA;
    else if (rule.processingRule == ProcessingRule.EQUAL_OR_GREATER_THAN)
      isValid = selectedValue >= rule.valueA;
    else if (rule.processingRule == ProcessingRule.LESS_THAN)
      isValid = selectedValue < rule.valueA;
    else if (rule.processingRule == ProcessingRule.EQUAL_OR_LESS_THAN)
      isValid = selectedValue <= rule.valueA;
    else if (ProcessingRule.EQUAL == rule.processingRule)
      isValid = selectedValue == rule.valueA;

    return isValid;
  };

  async calculateCombinedFields(
    scoreResult: ScoreResult[],
    surveyResultSumary: SurveyResultSumary[],
  ): Promise<number> {
    // Get Calculated Field to process
    const calculatedFileds = await this.prisma.calculatedField.findMany();

    //Get Calculated Field to process
    // const calculatedFileds: CalculatedField[] = [];
    let result = 0;

    calculatedFileds.map((item) => {
      const tempResults: boolean[] = [];

      // Add value to final result sumary
      surveyResultSumary.push({
        columnName: item.name,
        columnValue: item.operator,
      });

      // Create an array of booleans for next step
      item.questionIds.map((questionId) => {
        const index = scoreResult.findIndex((v) => v.questionId == questionId);

        if (index < 0) return;

        // add result
        tempResults.push(scoreResult[index].isValid);
      });

      let addToScore = false;
      // Get result according to operator
      if (item.operator == OperatorType.AND) {
        addToScore = tempResults.reduce(
          (accumulator, currentValue) => accumulator && currentValue,
          true,
        );
      } else if (item.operator == OperatorType.OR) {
        addToScore = tempResults.reduce(
          (accumulator, currentValue) => accumulator || currentValue,
          false,
        );
      }

      if (addToScore) result = result + item.scoreToAdd;

      // Add value to final result sumary
      surveyResultSumary.push({
        columnName: `Score ${item.name}`,
        columnValue: addToScore ? item.scoreToAdd.toString() : '0',
      });
    });

    return result;
  }

  async getSurveysOnExcel(): Promise<StreamableFile> {
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

      survey.surveyResultSumary.map((answer) => {
        const column = truncateString(answer.columnName, 100);
        if (!row[column]) row[column] = answer.columnValue;
      });

      result.push({
        fecha: survey.createdAt,
        paciente: survey.patient.lastName + ', ' + survey.patient.firstName,
        score: survey.calculatedScore,
        ...row,
      });
    });

    return result;
  }

  async getExcelHeader() {
    const questions = await this.questionService.findAll();

    console.log(questions);
  }
}
