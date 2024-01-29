import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedFieldsController } from './calculated-fields.controller';
import { CalculatedFieldsService } from './calculated-fields.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CalculatedFieldsController', () => {
  let controller: CalculatedFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalculatedFieldsController],
      providers: [CalculatedFieldsService, PrismaService],
    }).compile();

    controller = module.get<CalculatedFieldsController>(
      CalculatedFieldsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
