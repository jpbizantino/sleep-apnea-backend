import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QuestionFilterDto {
  @IsOptional()
  @ApiProperty()
  question: string;

  @IsOptional()
  @ApiProperty()
  description: string;
}
