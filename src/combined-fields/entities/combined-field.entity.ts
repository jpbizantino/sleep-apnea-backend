import { ApiProperty } from '@nestjs/swagger';
import { CombinedField } from '@prisma/client';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { RuleEntity } from 'src/questions/entities/rule.entity';

export class CombinedFieldEntity implements CombinedField {
  constructor(partial: Partial<CombinedFieldEntity>) {
    Object.assign(this, partial);
  }
  questionIds: string[];

  @ApiProperty()
  combinedFieldId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  questions: QuestionEntity[];

  @ApiProperty()
  rule: RuleEntity;
}
