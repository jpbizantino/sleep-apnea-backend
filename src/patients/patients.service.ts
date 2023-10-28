import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PatientsService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    return await this.prisma.patients.create({
      data: createPatientDto,
    });
  }

  async findAll() {
    return await this.prisma.patients.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.patients.findUnique({ where: { patientId: id } });
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    return await this.prisma.patients.update({
      where: { patientId: id },
      data: updatePatientDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.patients.delete({ where: { patientId: id } });
  }
}
