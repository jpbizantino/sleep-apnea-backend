import { ApiProperty } from '@nestjs/swagger';
import { SurveyEntity } from './survey.entity';

export class AnswerEntity {
  constructor(partial: Partial<SurveyEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  questionId: string;

  @ApiProperty()
  selectedValue: number;

  @ApiProperty()
  selectedText: string;

  @ApiProperty()
  jsonQuestion: string;
}
