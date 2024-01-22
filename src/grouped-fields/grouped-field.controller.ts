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
import { GroupedFieldsService } from './grouped-field.service';
import { CreateGroupedFieldDto } from './dto/create-grouped-field.dto';
import { UpdateGroupedFieldDto } from './dto/update-grouped_field.dto';

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { GroupedFieldEntity } from './entities/grouped-field.entity';

@Controller('grouped-fields')
@ApiTags('grouped-fields')
export class GroupedFieldsController {
  constructor(private readonly groupedFieldService: GroupedFieldsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: GroupedFieldEntity })
  async create(@Body() createGroupedFieldDto: CreateGroupedFieldDto) {
    return new GroupedFieldEntity(
      await this.groupedFieldService.create(createGroupedFieldDto),
    );
  }

  @Get('/findAllCombined')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GroupedFieldEntity, isArray: true })
  async findAllSingleresults() {
    return this.groupedFieldService.findAllCombined();
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GroupedFieldEntity, isArray: true })
  async findAll() {
    return this.groupedFieldService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GroupedFieldEntity })
  async findOne(@Param('id') id: string) {
    return new GroupedFieldEntity(await this.groupedFieldService.findOne(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: GroupedFieldEntity })
  async update(
    @Param('id') id: string,
    @Body() updateGroupedFieldDto: UpdateGroupedFieldDto,
  ) {
    return new GroupedFieldEntity(
      await this.groupedFieldService.update(id, updateGroupedFieldDto),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: GroupedFieldEntity })
  async remove(@Param('id') id: string) {
    return new GroupedFieldEntity(await this.groupedFieldService.remove(id));
  }
}
