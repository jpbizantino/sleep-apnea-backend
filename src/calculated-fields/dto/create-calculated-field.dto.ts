import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { GroupedFieldEntity } from 'src/grouped-fields/entities/grouped-field.entity';
import { QuestionEntity } from 'src/questions/entities/question.entity';

export class CreateCalculatedFieldDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  questions: QuestionEntity[];

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  groupedFields: GroupedFieldEntity[];

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
