import { Injectable } from '@nestjs/common';
import { CreateCalculatedFieldDto } from './dto/create-calculated-field.dto';
import { UpdateCalculatedFieldDto } from './dto/update-calculated-field.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalculatedFieldsService {
  constructor(private prisma: PrismaService) {}

  async create(createCalculatedFieldDto: CreateCalculatedFieldDto) {
    const questionsIds: string[] = [];

    createCalculatedFieldDto.questions.map((q) =>
      questionsIds.push(q.questionId),
    );

    return await this.prisma.calculatedField.create({
      data: {
        name: createCalculatedFieldDto.name,
        operator: createCalculatedFieldDto.operator,
        scoreToAdd: createCalculatedFieldDto.scoreToAdd,
        questionIds: createCalculatedFieldDto.questions.map(
          (p) => p.questionId,
        ),
        groupedFieldIds: createCalculatedFieldDto.groupedFields.map(
          (p) => p.groupedFieldId,
        ),
      },
    });
  }

  async findAll() {
    return await this.prisma.calculatedField.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.calculatedField.findUnique({
      where: { calculatedFieldId: id },
      include: {
        questions: true,
        groupedFields: { include: { calculatedField: true } },
      },
    });
  }

  async update(id: string, updatePatientDto: UpdateCalculatedFieldDto) {
    const questionsIds: string[] = [];

    updatePatientDto.questions.map((q) => questionsIds.push(q.questionId));

    return await this.prisma.calculatedField.update({
      where: { calculatedFieldId: id },
      data: {
        name: updatePatientDto.name,
        operator: updatePatientDto.operator,
        scoreToAdd: updatePatientDto.scoreToAdd,
        questionIds: updatePatientDto.questions.map((p) => p.questionId),
        groupedFieldIds: updatePatientDto.groupedFields.map(
          (p) => p.groupedFieldId,
        ),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.calculatedField.delete({
      where: { calculatedFieldId: id },
    });
  }
}
