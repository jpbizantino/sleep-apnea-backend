import { Module } from '@nestjs/common';
import { CalculatedFieldsService } from './calculated-fields.service';
import { CalculatedFieldsController } from './calculated-fields.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [CalculatedFieldsController],
  providers: [CalculatedFieldsService],
  imports: [PrismaModule],
})
export class CalculatedFieldsModule {}
