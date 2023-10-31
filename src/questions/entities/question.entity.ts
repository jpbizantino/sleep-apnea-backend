import { ApiProperty } from '@nestjs/swagger';
import { ChoiceEntity } from './choice.entity';
import { RuleEntity } from './rule.entity';

export class QuestionEntity {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  question: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  order: number;

  @ApiProperty()
  questionType: string;

  @ApiProperty()
  images: string[];

  @ApiProperty()
  choices: ChoiceEntity[];

  @ApiProperty()
  rule: RuleEntity;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
