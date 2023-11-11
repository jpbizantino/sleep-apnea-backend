import { Module } from '@nestjs/common';
import { SurveysService } from './surveys.service';
import { SurveysController } from './surveys.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { QuestionsService } from '../questions/questions.service';
import { EmailService } from '../mailer/email.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [SurveysController],
  providers: [SurveysService, QuestionsService, EmailService],
  imports: [PrismaModule, ConfigModule.forRoot()],
})
export class SurveysModule {}
