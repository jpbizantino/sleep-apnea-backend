import { ApiProperty } from '@nestjs/swagger';
import { AnswerEntity } from './answer.entity';

export class SurveyEntity {
  @ApiProperty()
  surveyId: string;

  @ApiProperty()
  patient: string;

  @ApiProperty()
  answer: AnswerEntity[];

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
