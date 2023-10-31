import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService],
  imports: [PrismaModule],
})
export class SurveysModule {}
