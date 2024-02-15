import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { AnswerEntity } from './answer.entity';
import { PatientEntity } from 'src/patients/entities/patient.entity';

export class SurveyEntity {
  constructor(partial: Partial<SurveyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  surveyId: string;

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  patient: PatientEntity;

  @ApiProperty()
  answers: AnswerEntity[];

  @ApiProperty()
  @Optional()
  calculatedScore: number;

  @ApiProperty()
  determinations: string[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
