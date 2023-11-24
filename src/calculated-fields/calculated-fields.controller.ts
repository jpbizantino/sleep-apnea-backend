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
import { CalculatedFieldsService } from './calculated-fields.service';
import { CreateCalculatedFieldDto } from './dto/create-calculated-field.dto';
import { UpdateCalculatedFieldDto } from './dto/update-calculated-field.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CalculatedFieldEntity } from './entities/calculated-field.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('calculated-fields')
@Controller('calculated-fields')
export class CalculatedFieldsController {
  constructor(
    private readonly calculatedFieldsService: CalculatedFieldsService,
  ) {}

  @Post()
  //@UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiCreatedResponse({ type: CalculatedFieldEntity })
  async create(@Body() createCalculatedFieldDto: CreateCalculatedFieldDto) {
    return new CalculatedFieldEntity(
      await this.calculatedFieldsService.create(createCalculatedFieldDto),
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CalculatedFieldEntity, isArray: true })
  async findAll() {
    const items = await this.calculatedFieldsService.findAll();

    return items.map((patient) => new CalculatedFieldEntity(patient));
  }

  @Get(':Id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CalculatedFieldEntity })
  async findOne(@Param('Id') Id: string) {
    return new CalculatedFieldEntity(
      await this.calculatedFieldsService.findOne(Id),
    );
  }

  @Patch(':Id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: CalculatedFieldEntity })
  async update(
    @Param('Id') Id: string,
    @Body() updateCalculatedField: UpdateCalculatedFieldDto,
  ) {
    return new CalculatedFieldEntity(
      await this.calculatedFieldsService.update(Id, updateCalculatedField),
    );
  }

  @Delete(':Id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: CalculatedFieldEntity })
  async remove(@Param('Id') Id: string) {
    return new CalculatedFieldEntity(
      await this.calculatedFieldsService.remove(Id),
    );
  }
}
