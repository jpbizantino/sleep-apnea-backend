import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { QuestionEntity } from 'src/questions/entities/question.entity';

export class CreateCalculatedFieldDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  questions: QuestionEntity[];

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  operator: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  scoreToAdd: number;
}
