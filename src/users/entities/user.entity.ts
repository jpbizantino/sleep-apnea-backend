import { ApiProperty } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements Users {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
  name: string;
  roleId: string;
  roleRoleId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  nameOne: string;

  @ApiProperty()
  nameTwo: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  expiration_date: Date;

  @ApiProperty()
  verificationCode: string;

  @ApiProperty()
  requestAddress: string;

  @ApiProperty()
  requestDate: Date;

  @ApiProperty()
  requestRetry: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @Exclude()
  password: string;
}
