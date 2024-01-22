import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CombinedFieldsController } from './combined-field.controller';
import { CombinedFieldsService } from './combined-field.service';

@Module({
  controllers: [CombinedFieldsController],
  providers: [CombinedFieldsService],
  imports: [PrismaModule],
})
export class CombinedFieldsModule {}
