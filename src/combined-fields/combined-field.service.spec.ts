import { Test, TestingModule } from '@nestjs/testing';
import { CombinedFieldsService } from './combined-field.service';

describe('CombinedFieldsService', () => {
  let service: CombinedFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CombinedFieldsService],
    }).compile();

    service = module.get<CombinedFieldsService>(CombinedFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
