import { ApiProperty } from '@nestjs/swagger';
import { AnswerEntity } from './answer.entity';
import { Optional } from '@nestjs/common';

export class SurveyEntity {
  @ApiProperty()
  surveyId: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  answers: AnswerEntity[];

  @ApiProperty()
  @Optional()
  calculatedStore: number;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
