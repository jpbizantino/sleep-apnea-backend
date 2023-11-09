import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Patch,
  Post,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { ResultDto } from './dto/result.dto';
import { UpdateSurveyDto } from './dto/update-survey.dto';
import { SurveyEntity } from './entities/survey.entity';
import { SurveysService } from './surveys.service';

@Controller('surveys')
@ApiTags('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: CreateSurveyDto })
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.create(createSurveyDto);
  }

  @Get('/exportExcel')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Header('content-disposition', 'attachment; filename="SheetJSNest.xlsx"')
  async downloadXlsxFile(): Promise<StreamableFile> {
    return await this.surveysService.getSurveysOnExcel();
  }

  @Get('/sendEmail/:id')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  async sendEmail(@Param('id') id: string) {
    return await this.surveysService.sendEmail(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SurveyEntity, isArray: true })
  findAll() {
    return this.surveysService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SurveyEntity })
  async findOne(@Param('id') id: string) {
    return await this.surveysService.findOne(id);
  }

  @Get('/runAlgorithm/:id')
  @ApiCreatedResponse({ type: ResultDto })
  runAlgotithm(@Param('id') id: string) {
    return this.surveysService.runAlgorithm(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: SurveyEntity })
  update(@Param('id') id: string, @Body() updateSurveyDto: UpdateSurveyDto) {
    return this.surveysService.update(id, updateSurveyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: SurveyEntity })
  remove(@Param('id') id: string) {
    return this.surveysService.remove(id);
  }
}
