import { ApiProperty } from '@nestjs/swagger';

export class ChoiceEntity {
  @ApiProperty()
  description: string;

  @ApiProperty()
  choiceValue: number;

  @ApiProperty()
  order: number;
}
