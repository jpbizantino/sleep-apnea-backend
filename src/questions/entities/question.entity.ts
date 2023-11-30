import { ApiProperty } from '@nestjs/swagger';
import { ChoiceEntity } from './choice.entity';
import { RuleEntity } from './rule.entity';
import { Question } from '@prisma/client';

export class QuestionEntity implements Question {
  constructor(partial: Partial<QuestionEntity>) {
    Object.assign(this, partial);
  }
  calculatedFiledIds: string[];

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
