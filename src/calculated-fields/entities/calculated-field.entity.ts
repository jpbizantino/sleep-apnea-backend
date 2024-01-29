import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from '../../questions/entities/question.entity';
import { CalculatedField } from '@prisma/client';
import { GroupedFieldEntity } from '../../grouped-fields/entities/grouped-field.entity';

export class CalculatedFieldEntity implements CalculatedField {
  constructor(partial: Partial<CalculatedFieldEntity>) {
    Object.assign(this, partial);
  }
  groupedFieldIds: string[];
  questionIds: string[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  calculatedFieldId: string;

  @ApiProperty()
  questions: QuestionEntity[];

  @ApiProperty()
  groupedFields: Partial<GroupedFieldEntity>[];

  @ApiProperty()
  operator: string;

  @ApiProperty()
  scoreToAdd: number;
}
