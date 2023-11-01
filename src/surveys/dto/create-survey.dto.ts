import { ApiProperty } from '@nestjs/swagger';
import { AnswerDto } from './answer.dto';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CreateSurveyDto {
  @IsNotEmpty()
  @ApiProperty()
  patientId: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  answers: AnswerDto[];
}
