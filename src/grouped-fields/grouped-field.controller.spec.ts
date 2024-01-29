import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { GroupedFieldsController } from './grouped-field.controller';
import { GroupedFieldsService } from './grouped-field.service';

describe('GroupedFieldsController', () => {
  let controller: GroupedFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupedFieldsController],
      providers: [GroupedFieldsService, PrismaService],
    }).compile();

    controller = module.get<GroupedFieldsController>(GroupedFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
