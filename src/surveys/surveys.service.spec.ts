import { Test, TestingModule } from '@nestjs/testing';
import { SurveysService } from './surveys.service';
import { PrismaService } from '../prisma/prisma.service';

describe('SurveysService', () => {
  let service: SurveysService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveysService, PrismaService],
    }).compile();

    service = module.get<SurveysService>(SurveysService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be an instance of Patient', async () => {
    prisma.survey.findUnique = jest.fn().mockReturnValueOnce([
      {
        _id: {
          $oid: '65b7a947b7a73236d9e95c2d',
        },
        calculatedScore: {
          $numberLong: '0',
        },
        createdAt: {
          $date: '2024-01-29T13:33:59.261Z',
        },
        updatedAt: {
          $date: '2024-01-29T13:34:01.451Z',
        },
        patientId: {
          $oid: '65b7a941b7a73236d9e95c2c',
        },
        answers: [
          {
            questionId: '655209fdcb615ccf4d61cb04',
            jsonQuestion:
              '{"choices":[{"choiceId":"03c6b8f3-d338-4777-8206-bcdb0d046024","description":"SI","choiceValue":1,"order":1},{"choiceId":"8f30d8fd-0587-406f-99fe-c301fc3609c6","description":"NO","choiceValue":0,"order":2}],"rule":{"processingRule":"EQUAL","scoreAction":"GROUP_SCORE","valueA":1,"valueB":0,"scoreToAdd":5},"questionId":"655209fdcb615ccf4d61cb04","question":"¿FUMA CIGARRILLOS?","description":".","order":0,"questionType":"CHOICE","imageLink":"","active":true,"createdAt":"2023-11-13T11:35:25.091Z","updatedAt":"2024-01-29T13:19:07.413Z","calculatedFiledIds":[],"groupedFiledIds":[]}',
            selectedValue: {
              $numberLong: '1',
            },
            selectedText: 'SI',
          },
          {
            questionId: '652de2e0d536c388cf7a1430',
            jsonQuestion:
              '{"choices":[{"choiceId":"6531d60a1be1937019ddb8de","description":"SI","choiceValue":1,"order":0},{"choiceId":"6531d60a1be1937019ddb8df","description":"NO","choiceValue":0,"order":0}],"rule":{"processingRule":"EQUAL","scoreAction":"GROUP_SCORE","valueA":1,"valueB":0,"scoreToAdd":4},"questionId":"652de2e0d536c388cf7a1430","question":"¿ES EX-FUMADOR?","description":"SELECCIONE UNA OPCIÓN","order":1,"questionType":"CHOICE","imageLink":"","active":true,"createdAt":"2023-10-17T01:19:51.170Z","updatedAt":"2024-01-29T13:19:16.114Z","calculatedFiledIds":[],"groupedFiledIds":[]}',
            selectedValue: {
              $numberLong: '1',
            },
            selectedText: 'SI',
          },
        ],
        surveyResultSumary: [
          {
            columnName: 'Edad',
            columnValue: '42',
          },
          {
            columnName: 'Score Edad',
            columnValue: '1',
          },
          {
            columnName: 'Género',
            columnValue: 'M',
          },
          {
            columnName: 'Score Género',
            columnValue: '1',
          },
          {
            columnName: 'Altura',
            columnValue: '100',
          },
          {
            columnName: 'Peso (Kg)',
            columnValue: '100',
          },
          {
            columnName: 'IMC',
            columnValue: '100',
          },
          {
            columnName: 'Score IMC',
            columnValue: '2',
          },
          {
            columnName: '¿FUMA CIGARRILLOS?',
            columnValue: '1',
          },
          {
            columnName: 'Score ¿FUMA CIGARRILLOS?',
            columnValue: '5',
          },
          {
            columnName: '¿ES EX-FUMADOR?',
            columnValue: '1',
          },
          {
            columnName: 'Score ¿ES EX-FUMADOR?',
            columnValue: '4',
          },
          {
            columnName: 'Cansancio',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Cansancio',
            columnValue: '0',
          },
          {
            columnName: 'Insomnio',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Insomnio',
            columnValue: '0',
          },
          {
            columnName: 'Enfermedad coronaria',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Enfermedad coronaria',
            columnValue: '0',
          },
          {
            columnName: 'Hipertensión ',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Hipertensión ',
            columnValue: '0',
          },
          {
            columnName: 'Arritmia cardíaca',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Arritmia cardíaca',
            columnValue: '0',
          },
          {
            columnName: 'Accidente cerebrovascular',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Accidente cerebrovascular',
            columnValue: '0',
          },
          {
            columnName: 'Diabetes',
            columnValue: 'OR',
          },
          {
            columnName: 'Score Diabetes',
            columnValue: '0',
          },
        ],
      },
    ]);

    prisma.question.findMany = jest.fn().mockReturnValueOnce([
      {
        choices: [
          {
            choiceId: '03c6b8f3-d338-4777-8206-bcdb0d046024',
            description: 'SI',
            choiceValue: 1,
            order: 1,
          },
          {
            choiceId: '8f30d8fd-0587-406f-99fe-c301fc3609c6',
            description: 'NO',
            choiceValue: 0,
            order: 2,
          },
        ],
        rule: {
          processingRule: 'EQUAL',
          scoreAction: 'GROUP_SCORE',
          valueA: 1,
          valueB: 0,
          scoreToAdd: 5,
        },
        questionId: '655209fdcb615ccf4d61cb04',
        question: '¿FUMA CIGARRILLOS?',
        description: '.',
        order: 0,
        questionType: 'CHOICE',
        imageLink: '',
        active: true,
        createdAt: '2023-11-13T11:35:25.091Z',
        updatedAt: '2024-01-29T13:19:07.413Z',
        calculatedFiledIds: [],
        groupedFiledIds: [],
      },
      {
        choices: [
          {
            choiceId: '6531d60a1be1937019ddb8de',
            description: 'SI',
            choiceValue: 1,
            order: 0,
          },
          {
            choiceId: '6531d60a1be1937019ddb8df',
            description: 'NO',
            choiceValue: 0,
            order: 0,
          },
        ],
        rule: {
          processingRule: 'EQUAL',
          scoreAction: 'GROUP_SCORE',
          valueA: 1,
          valueB: 0,
          scoreToAdd: 4,
        },
        questionId: '652de2e0d536c388cf7a1430',
        question: '¿ES EX-FUMADOR?',
        description: 'SELECCIONE UNA OPCIÓN',
        order: 1,
        questionType: 'CHOICE',
        imageLink: '',
        active: true,
        createdAt: '2023-10-17T01:19:51.170Z',
        updatedAt: '2024-01-29T13:19:16.114Z',
        calculatedFiledIds: [],
        groupedFiledIds: [],
      },
    ]);

    const result = await service.runAlgorithm('65b7a947b7a73236d9e95c2d');

    expect(result).toBeGreaterThan(0);
  });
});
