import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsOptional,
  IsUrl,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { QuestionTypeEnum } from '../../common/enums/question.enum';
import { ChoiceDto } from './choice.dto';
import { RuleDto } from './rule.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsOptional()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsEnum(QuestionTypeEnum)
  @ApiProperty()
  questionType: QuestionTypeEnum;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  order: number;

  @ValidateIf((o) => o.questionType === QuestionTypeEnum.CHOICE)
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ChoiceDto)
  @ApiProperty()
  choices: ChoiceDto[];

  @IsNotEmpty()
  @IsNotEmptyObject()
  // @ValidateNested({ each: true })
  @Type(() => RuleDto)
  @ApiProperty()
  rule: RuleDto;

  @ValidateIf((o) => o.imageLink && o.imageLink.length > 0)
  @IsUrl()
  imageLink: string;

  @IsNotEmpty()
  @IsBoolean()
  active: boolean;

  constructor() {
    this.order = 0;
  }
}
