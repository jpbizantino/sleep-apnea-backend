import { Injectable } from '@nestjs/common';
import { scoreActionEnum } from '../common/enums/scoreAction.enum';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGroupedFieldDto } from './dto/create-grouped-field.dto';
import { UpdateGroupedFieldDto } from './dto/update-grouped_field.dto';

@Injectable()
export class GroupedFieldsService {
  constructor(private prisma: PrismaService) {}

  async create(updateGroupedFieldDto: CreateGroupedFieldDto) {
    return await this.prisma.groupedField.create({
      data: {
        name: updateGroupedFieldDto.name,
        questionIds: updateGroupedFieldDto.questions.map((q) => q.questionId),
        rule: updateGroupedFieldDto.rule,
      },
    });
  }

  async findAll() {
    return await this.prisma.groupedField.findMany({
      include: { questions: true },
    });
  }

  async findAllCombined() {
    const result = await this.prisma.groupedField.findMany({
      include: { questions: true },
    });

    return result.filter(
      (p) => p.rule.scoreAction == scoreActionEnum.COMBINE_SCORE,
    );
  }

  async findOne(id: string) {
    return await this.prisma.groupedField.findUnique({
      where: { groupedFieldId: id },
      include: { questions: true },
    });
  }

  async update(id: string, updateGroupedFieldDto: UpdateGroupedFieldDto) {
    return await this.prisma.groupedField.update({
      where: { groupedFieldId: id },
      data: {
        name: updateGroupedFieldDto.name,
        questionIds: updateGroupedFieldDto.questions.map((q) => q.questionId),
        rule: updateGroupedFieldDto.rule,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.groupedField.delete({ where: { groupedFieldId: id } });
  }
}
