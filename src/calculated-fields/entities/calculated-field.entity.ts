import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from 'src/questions/entities/question.entity';
import { CalculatedField } from '@prisma/client';

export class CalculatedFieldEntity implements CalculatedField {
  constructor(partial: Partial<CalculatedFieldEntity>) {
    Object.assign(this, partial);
  }
  questionIds: string[];

  @ApiProperty()
  name: string;

  @ApiProperty()
  calculatedFieldId: string;

  @ApiProperty()
  questions: QuestionEntity[];

  @ApiProperty()
  operator: string;

  @ApiProperty()
  scoreToAdd: number;
}
