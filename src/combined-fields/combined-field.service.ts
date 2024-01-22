import { Injectable } from '@nestjs/common';
import { scoreActionEnum } from 'src/common/enums/scoreAction.emu';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCombinedFieldDto } from './dto/create-combined-field.dto';
import { UpdateCombinedFieldDto } from './dto/update-combined_field.dto';

@Injectable()
export class CombinedFieldsService {
  constructor(private prisma: PrismaService) {}

  async create(updateCombinedFieldDto: CreateCombinedFieldDto) {
    return await this.prisma.combinedField.create({
      data: {
        name: updateCombinedFieldDto.name,
        questionIds: updateCombinedFieldDto.questions.map((q) => q.questionId),
        rule: updateCombinedFieldDto.rule,
      },
    });
  }

  async findAll() {
    return await this.prisma.combinedField.findMany({});
  }

  async findAllSingleResults() {
    const result = await this.prisma.combinedField.findMany({});

    return result.filter(
      (p) => p.rule.scoreAction == scoreActionEnum.ADD_TO_FINAL_SCORE,
    );
  }

  async findOne(id: string) {
    return await this.prisma.combinedField.findUnique({
      where: { combinedFieldId: id },
    });
  }

  async update(id: string, updateCombinedFieldDto: UpdateCombinedFieldDto) {
    return await this.prisma.combinedField.update({
      where: { combinedFieldId: id },
      data: {
        name: updateCombinedFieldDto.name,
        questionIds: updateCombinedFieldDto.questions.map((q) => q.questionId),
        rule: updateCombinedFieldDto.rule,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.combinedField.delete({ where: { combinedFieldId: id } });
  }
}
