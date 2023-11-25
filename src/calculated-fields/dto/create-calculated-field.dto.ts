import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { QuestionEntity } from 'src/questions/entities/question.entity';

export class CreateCalculatedFieldDto {
  @IsNotEmpty()
  @ApiProperty()
  calculatedFieldId: string;

  @IsNotEmpty()
  @ApiProperty()
  questions: QuestionEntity[];

  @IsNotEmpty()
  @ApiProperty()
  operator: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  scoreToAdd: number;
}
