import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCalculatedFieldDto {
  @IsNotEmpty()
  @ApiProperty()
  calculatedFieldId: string;

  @IsNotEmpty()
  @ApiProperty()
  questions: string[];

  @IsNotEmpty()
  @ApiProperty()
  operator: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  scoreToAdd: number;
}
