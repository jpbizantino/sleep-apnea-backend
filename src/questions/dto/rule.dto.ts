import { IsEnum, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcessingRule } from '../../common/enums/rule.enum';

export class RuleDto {
  @IsNotEmpty()
  @IsEnum(ProcessingRule)
  @ApiProperty()
  processingRule: ProcessingRule;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  valueA: number;

  @ValidateIf((o) => [ProcessingRule.BETWEEN].some(o.questionType))
  @IsNumber()
  @ApiProperty()
  valueB: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  scoreToAdd: number;
}
