import { Injectable } from '@nestjs/common';
import { Survey } from '@prisma/client';
import { ParameterName } from 'src/common/enums/parameter.enum';
import { ProcessingRule } from 'src/common/enums/rule.enum';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ResultDto } from './dto/result.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { AnswerEntity } from './entities/answer.entity';

@Injectable()
export class SurveysService {
  constructor(private prisma: PrismaService) {}

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

  async findOne(id: string) {
    return await this.prisma.survey.findUnique({ where: { surveyId: id } });
  }

  update(id: string, updateSurveyDto: UpdateSurveyDto) {
    return this.prisma.survey.update({
      where: { surveyId: id },
      data: updateSurveyDto,
    });
  }

  remove(id: string) {
    return this.prisma.user.delete({ where: { userId: id } });
  }

  runAlgorithm = async (Id: string): Promise<ResultDto> => {
    let calculatedScore = 0;
    let desitionScore = 0;

    const positiveMessage =
      'Basado es sus respuestas, Ud. tiene moderada a alta probabilidad de padecer apnea obstructiva del sueño.';

    const negativeMessage =
      'Basado es sus respuestas, Ud. tiene baja probabilidad de padecer apnea obstructiva del sueño.';

    const resultDto: ResultDto = {
      positive: false,
      message: negativeMessage,
      recomendation:
        'Esta encuesta es orientativa. Siempre consulte a su médico.',
      score: 0,
    };

    // Get all questions
    const questions: QuestionEntity[] = []; // await this.prisma.question.findMany();

    // Get score
    await this.prisma.parameter
      .findUnique({ where: { name: ParameterName.DESITION_SCORE } })
      .then((result) => (desitionScore = parseInt(result.value)));

    // Get survey results
    await this.prisma.survey
      .findUnique({ where: { surveyId: Id } })
      .then((survey: Survey) => {
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
}
