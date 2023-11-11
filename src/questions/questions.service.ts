import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    return await this.prisma.question.create({ data: createQuestionDto });
  }

  async findAll() {
    return await this.prisma.question.findMany();
  }

  async findAllSurvey() {
    return await this.prisma.question.findMany({ where: { active: true } });
  }

  async findOne(id: string) {
    return await this.prisma.question.findUnique({ where: { questionId: id } });
  }

  async update(id: string, updateQuestionDto: UpdateQuestionDto) {
    return await this.prisma.question.update({
      where: { questionId: id },
      data: updateQuestionDto,
    });
  }

  async remove(id: string) {
    return this.prisma.question.delete({ where: { questionId: id } });
  }
}
