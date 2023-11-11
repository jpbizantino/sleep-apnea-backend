import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PatientEntity } from './entities/patient.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: PatientEntity })
  async create(@Body() createPatientDto: CreatePatientDto) {
    return new PatientEntity(
      await this.patientsService.create(createPatientDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity, isArray: true })
  async findAll() {
    const patients = await this.patientsService.findAll();

    return patients.map((patient) => new PatientEntity(patient));
  }

  @Get(':patientId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity })
  async findOne(@Param('patientId') patientId: string) {
    return new PatientEntity(await this.patientsService.findOne(patientId));
  }

  @Patch(':patientId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: PatientEntity })
  async update(
    @Param('patientId') patientId: string,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return new PatientEntity(
      await this.patientsService.update(patientId, updatePatientDto),
    );
  }

  @Delete(':patientId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: PatientEntity })
  async remove(@Param('patientId') patientId: string) {
    return new PatientEntity(await this.patientsService.remove(patientId));
  }
}
