import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsService } from './questions.service';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionEntity } from './entities/question.entity';

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

  @Get('/singleResults')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity, isArray: true })
  async findAllSingleresults() {
    return this.questionsService.findAllSingleResults();
  }

  @Get('/groupedScore')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity, isArray: true })
  async findAllGroupScore() {
    return this.questionsService.findAllGroupScore();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: QuestionEntity, isArray: true })
  async findAll() {
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

  @Patch('/moveUp/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async moveUp(@Param('id') id: string) {
    await this.questionsService.questionUp(id);
  }

  @Patch('/moveDown/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse()
  async moveDown(@Param('id') id: string) {
    return await this.questionsService.questionDown(id);
  }
}
