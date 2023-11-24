import { ApiProperty } from '@nestjs/swagger';

export class CalculatedFieldEntity {
  constructor(partial: Partial<CalculatedFieldEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  calculatedFieldId: string;

  @ApiProperty()
  questions: string[];

  @ApiProperty()
  operator: string;

  @ApiProperty()
  scoreToAdd: number;
}
