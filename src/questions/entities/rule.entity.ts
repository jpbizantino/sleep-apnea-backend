import { ApiProperty } from '@nestjs/swagger';
import { ProcessingRule } from 'src/common/enums/rule.enum';

export class RuleEntity {
  @ApiProperty()
  processingRule: ProcessingRule;

  @ApiProperty()
  valueA: number;

  @ApiProperty()
  valueB: number;
}
