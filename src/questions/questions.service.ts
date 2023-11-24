import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from '../prisma/prisma.service';
import { QuestionEntity } from './entities/question.entity';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const lastOrder = await this.prisma.question.aggregate({
      _max: { order: true },
    });

    // Set order
    createQuestionDto.order = lastOrder._max.order + 1;

    return await this.prisma.question.create({ data: createQuestionDto });
  }

  async findAll() {
    return await this.prisma.question.findMany({ orderBy: { order: 'asc' } });
  }

  async findAllSurvey() {
    return await this.prisma.question.findMany({
      where: { active: true },
      orderBy: { order: 'asc' },
    });
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

  async questionUp(id: string) {
    const rows = await this.prisma.question.findMany({
      orderBy: { order: 'asc' },
    });
    const updateRows: QuestionEntity[] = [];

    // 1. Get item position
    const getIndex = rows.findIndex((p) => p.questionId === id);

    // 2. Return if index is the last
    if (getIndex == 0) return;

    // 3. Move swap position and change the upper item order
    for (let index = 0; index < getIndex + 1; index++) {
      if (index == getIndex)
        updateRows.push({ ...rows[index], order: index - 1 });
      else if (index == getIndex - 1)
        updateRows.push({ ...rows[index], order: index + 1 });
    }

    await this.prisma.$transaction(
      updateRows.map((item) =>
        this.prisma.question.update({
          where: { questionId: item.questionId },
          data: { order: item.order },
        }),
      ),
    );
  }

  async questionDown(id: string) {
    const rows = await this.prisma.question.findMany({
      orderBy: { order: 'asc' },
    });
    const updateRows: QuestionEntity[] = [];

    // 1. Get item position
    const getIndex = rows.findIndex((p) => p.questionId === id);

    // 2. Return if index is the last
    if (getIndex == rows.length - 1) return;

    // 3. Move swap position and change the upper item order
    for (let index = getIndex; index < rows.length; index++) {
      if (index == getIndex)
        updateRows.push({ ...rows[index], order: index + 1 });
      else if (index == getIndex + 1)
        updateRows.push({ ...rows[index], order: index - 1 });
    }

    await this.prisma.$transaction(
      updateRows.map((item) =>
        this.prisma.question.update({
          where: { questionId: item.questionId },
          data: { order: item.order },
        }),
      ),
    );
  }
}
