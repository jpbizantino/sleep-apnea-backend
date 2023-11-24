import { Injectable } from '@nestjs/common';
import { CreateCalculatedFieldDto } from './dto/create-calculated-field.dto';
import { UpdateCalculatedFieldDto } from './dto/update-calculated-field.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CalculatedFieldsService {
  constructor(private prisma: PrismaService) {}

  async create(createCalculatedFieldDto: CreateCalculatedFieldDto) {
    return await this.prisma.calculatedField.create({
      data: createCalculatedFieldDto,
    });
  }

  async findAll() {
    return await this.prisma.calculatedField.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.calculatedField.findUnique({
      where: { calculatedFieldId: id },
    });
  }

  async update(id: string, updatePatientDto: UpdateCalculatedFieldDto) {
    return await this.prisma.calculatedField.update({
      where: { calculatedFieldId: id },
      data: updatePatientDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.calculatedField.delete({
      where: { calculatedFieldId: id },
    });
  }
}
