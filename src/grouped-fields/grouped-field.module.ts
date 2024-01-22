import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GroupedFieldsController } from './grouped-field.controller';
import { GroupedFieldsService } from './grouped-field.service';

@Module({
  controllers: [GroupedFieldsController],
  providers: [GroupedFieldsService],
  imports: [PrismaModule],
})
export class GroupedFieldsModule {}
