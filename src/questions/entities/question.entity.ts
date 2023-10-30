import { ApiProperty } from '@nestjs/swagger';
import { RuleEntity } from './rule.entity';
import { QuestionType } from 'src/common/enums/question.enum';
import { ChoiceEntity } from './choice.entity';

export class QuestionEntity {
  @ApiProperty()
  question: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  questionType: QuestionType;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  choices: ChoiceEntity[];

  @ApiProperty()
  rule: RuleEntity;
}
