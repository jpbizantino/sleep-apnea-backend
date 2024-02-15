import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNotEmptyObject } from 'class-validator';
import { RuleDto } from '../../questions/dto/rule.dto';
import { QuestionEntity } from '../../questions/entities/question.entity';

export class CreateGroupedFieldDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsArray()
  questions: QuestionEntity[];

  @IsNotEmpty()
  @IsNotEmptyObject()
  @Type(() => RuleDto)
  @ApiProperty()
  rule: RuleDto;

  @IsNotEmpty()
  @ApiProperty()
  derivedPatology: string;
}
