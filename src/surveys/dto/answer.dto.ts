import { ApiProperty } from '@nestjs/swagger';

export class AnswerDto {
  @ApiProperty()
  questionId: string;

  @ApiProperty()
  selectedDescription: string;

  @ApiProperty()
  selectedValue: string;
}
