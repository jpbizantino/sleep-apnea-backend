import { IsEnum, IsNotEmpty, IsNumber, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProcessingRuleEnum } from '../../common/enums/rule.enum';
import { scoreActionEnum } from '../../common/enums/scoreAction.enum';

export class RuleDto {
  @IsNotEmpty()
  @IsEnum(ProcessingRuleEnum)
  @ApiProperty()
  processingRule: ProcessingRuleEnum;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  valueA: number;

  @ValidateIf((o) => [ProcessingRuleEnum.BETWEEN].some(o.questionType))
  @IsNumber()
  @ApiProperty()
  valueB: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  scoreToAdd: number;

  @IsNotEmpty()
  @IsEnum(scoreActionEnum)
  @ApiProperty()
  scoreAction: string;
}
