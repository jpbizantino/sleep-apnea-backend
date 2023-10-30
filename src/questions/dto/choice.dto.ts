import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class ChoiceDto {
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  choiceValue: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @ApiProperty()
  order: number;
}
