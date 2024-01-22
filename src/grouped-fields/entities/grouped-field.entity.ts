import { ApiProperty } from '@nestjs/swagger';
import { GroupedField } from '@prisma/client';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { RuleEntity } from 'src/questions/entities/rule.entity';

export class GroupedFieldEntity implements GroupedField {
  constructor(partial: Partial<GroupedFieldEntity>) {
    Object.assign(this, partial);
  }
  calculatedFiledIds: string[];
  questionIds: string[];

  @ApiProperty()
  groupedFieldId: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  questions: QuestionEntity[];

  @ApiProperty()
  groupedFields: Partial<GroupedFieldEntity>[];

  @ApiProperty()
  rule: RuleEntity;
}
