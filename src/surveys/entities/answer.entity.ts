import { ApiProperty } from '@nestjs/swagger';

export class AnswerEntity {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  selectedValue: number;

  @ApiProperty()
  jsonQuestion: string;
}
