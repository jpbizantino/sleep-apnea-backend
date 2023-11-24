import { Test, TestingModule } from '@nestjs/testing';
import { CalculatedFieldsService } from './calculated-fields.service';

describe('CalculatedFieldsService', () => {
  let service: CalculatedFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalculatedFieldsService],
    }).compile();

    service = module.get<CalculatedFieldsService>(CalculatedFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
