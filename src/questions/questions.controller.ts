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
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { QuestionEntity } from './entities/question.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('questions')
@ApiTags('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: QuestionEntity })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return new QuestionEntity(
      await this.questionsService.create(createQuestionDto),
    );
  }

  @Get('/survey')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity, isArray: true })
  async findAllSurvey() {
    const questions = await this.questionsService.findAllSurvey();
    return questions.map((question) => new QuestionEntity(question));
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity, isArray: true })
  asyncfindAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity })
  async findOne(@Param('id') id: string) {
    return new QuestionEntity(await this.questionsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: QuestionEntity })
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return new QuestionEntity(
      await this.questionsService.update(id, updateQuestionDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity })
  async remove(@Param('id') id: string) {
    return new QuestionEntity(await this.questionsService.remove(id));
  }
}
