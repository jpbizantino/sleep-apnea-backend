import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from 'src/prisma/prisma.service';
import { CombinedFieldsController } from './combined-field.controller';
import { CombinedFieldsService } from './combined-field.service';

describe('CombinedFieldsController', () => {
  let controller: CombinedFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CombinedFieldsController],
      providers: [CombinedFieldsService, PrismaService],
    }).compile();

    controller = module.get<CombinedFieldsController>(CombinedFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
