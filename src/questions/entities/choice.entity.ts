import { ApiProperty } from '@nestjs/swagger';

export class ChoiceEntity {
  constructor(partial: Partial<ChoiceEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  description: string;

  @ApiProperty()
  choiceValue: number;

  @ApiProperty()
  order: number;
}
