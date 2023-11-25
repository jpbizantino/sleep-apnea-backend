import { ApiProperty } from '@nestjs/swagger';
import { QuestionEntity } from 'src/questions/entities/question.entity';

export class CalculatedFieldEntity {
  constructor(partial: Partial<CalculatedFieldEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  calculatedFieldId: string;

  @ApiProperty()
  questions: QuestionEntity[];

  @ApiProperty()
  operator: string;

  @ApiProperty()
  scoreToAdd: number;
}
