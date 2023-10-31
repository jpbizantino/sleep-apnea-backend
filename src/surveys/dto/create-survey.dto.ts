import { ApiProperty } from '@nestjs/swagger';
import { AnswerDto } from './answer.dto';

export class CreateSurveyDto {
  @ApiProperty()
  patientId: string;

  @ApiProperty()
  answer: AnswerDto[];
}
