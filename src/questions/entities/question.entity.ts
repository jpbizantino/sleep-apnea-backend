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
  imageLink: string;

  @ApiProperty()
  choices: ChoiceEntity[];

  @ApiProperty()
  rule: RuleEntity;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
