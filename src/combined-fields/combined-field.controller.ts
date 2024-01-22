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
import { CombinedFieldsService } from './combined-field.service';
import { CreateCombinedFieldDto } from './dto/create-combined-field.dto';
import { UpdateCombinedFieldDto } from './dto/update-combined_field.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CombinedFieldEntity } from './entities/combined-field.entity';

@Controller('combined-fields')
@ApiTags('combined-fields')
export class CombinedFieldsController {
  constructor(private readonly questionsService: CombinedFieldsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CombinedFieldEntity })
  async create(@Body() createCombinedFieldDto: CreateCombinedFieldDto) {
    return new CombinedFieldEntity(
      await this.questionsService.create(createCombinedFieldDto),
    );
  }

  @Get('/singleResults')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CombinedFieldEntity, isArray: true })
  async findAllSingleresults() {
    return this.questionsService.findAllSingleResults();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CombinedFieldEntity, isArray: true })
  async findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CombinedFieldEntity })
  async findOne(@Param('id') id: string) {
    return new CombinedFieldEntity(await this.questionsService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CombinedFieldEntity })
  async update(
    @Param('id') id: string,
    @Body() updateCombinedFieldDto: UpdateCombinedFieldDto,
  ) {
    return new CombinedFieldEntity(
      await this.questionsService.update(id, updateCombinedFieldDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CombinedFieldEntity })
  async remove(@Param('id') id: string) {
    return new CombinedFieldEntity(await this.questionsService.remove(id));
  }
}
