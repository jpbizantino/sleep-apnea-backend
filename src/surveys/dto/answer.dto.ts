import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AnswerDto {
  @ApiProperty()
  @IsNotEmpty()
  questionId: string;

  @ApiProperty()
  @IsNotEmpty()
  selectedValue: number;

  @ApiProperty()
  @IsNotEmpty()
  selectedText: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jsonQuestion: string;
}
