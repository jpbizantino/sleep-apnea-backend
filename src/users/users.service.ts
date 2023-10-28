import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

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

    return this.prisma.users.create({
      data: createUserDto,
    });
  }

  async findAll() {
    return await this.prisma.users.findMany();
  }

  async findOne(userId: string) {
    return await this.prisma.users.findUnique({ where: { userId: userId } });
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        roundsOfHashing,
      );
    }

    return this.prisma.users.update({
      where: { userId: userId },
      data: updateUserDto,
    });
  }

  remove(userid: string) {
    return this.prisma.users.delete({ where: { userId: userid } });
  }
}
