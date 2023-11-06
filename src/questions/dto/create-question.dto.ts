import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { QuestionType } from 'src/common/enums/question.enum';
import { ChoiceDto } from './choice.dto';
import { RuleDto } from './rule.dto';

export class CreateQuestionDto {
  @IsNotEmpty()
  @ApiProperty()
  question: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsEnum(QuestionType)
  @ApiProperty()
  questionType: QuestionType;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  order: number;

  @ValidateIf((o) => o.questionType === QuestionType.CHOICE)
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

  @IsNotEmpty()
  imageLink: string;

  constructor() {
    this.order = 0;
  }
}
