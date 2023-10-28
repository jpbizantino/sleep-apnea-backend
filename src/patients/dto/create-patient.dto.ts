// export class CreatePatientDto {}

import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  lastName: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsDateString()
  @ApiProperty()
  dateOfBirth: Date;

  @IsString()
  @Length(1)
  @ApiProperty()
  gender: string;

  @IsNumber()
  @Min(10)
  @Max(150)
  @ApiProperty()
  weight: number;

  @IsNumber()
  @Min(100)
  @Max(250)
  @ApiProperty()
  height: number;
}
