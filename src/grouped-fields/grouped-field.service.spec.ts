import { Test, TestingModule } from '@nestjs/testing';
import { GroupedFieldsService } from './grouped-field.service';

describe('GroupedFieldsService', () => {
  let service: GroupedFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupedFieldsService],
    }).compile();

    service = module.get<GroupedFieldsService>(GroupedFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
