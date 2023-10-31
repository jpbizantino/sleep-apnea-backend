import { ApiProperty } from '@nestjs/swagger';

export class AnswerEntity {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  selectedDescription: string;

  @ApiProperty()
  selectedValue: string;
}
