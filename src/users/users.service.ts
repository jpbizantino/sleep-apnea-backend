import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';

export const roundsOfHashing = 10;
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      roundsOfHashing,
    );

    createUserDto.password = hashedPassword;

    return new UserEntity(
      await this.prisma.user.create({
        data: createUserDto,
      }),
    );
  }

  async findAll() {
    const list = await this.prisma.user.findMany({});
    return list.map((item) => new UserEntity(item));
  }

  async findOne(userId: string) {
    return new UserEntity(
      await this.prisma.user.findUnique({
        where: { userId: userId },
      }),
    );
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return new UserEntity(
      await this.prisma.user.update({
        where: { userId: userId },
        data: updateUserDto,
      }),
    );
  }

  async remove(userid: string) {
    return new UserEntity(
      await this.prisma.user.delete({ where: { userId: userid } }),
    );
  }
}
