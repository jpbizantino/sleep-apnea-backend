import { ApiProperty } from '@nestjs/swagger';

export class PatientEntity {
  constructor(partial: Partial<PatientEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  patientId: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  dateOfBirth: Date;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  height: number;
}
