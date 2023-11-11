import { Test, TestingModule } from '@nestjs/testing';
import { SurveysController } from './surveys.controller';
import { SurveysService } from './surveys.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('SurveysController', () => {
  let controller: SurveysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SurveysController, PrismaService],
      providers: [SurveysService],
    }).compile();

    controller = module.get<SurveysController>(SurveysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
