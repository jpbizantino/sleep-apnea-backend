import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';
import { SurveysModule } from './surveys/surveys.module';
import { PrismaModule } from 'nestjs-prisma';
import { EmailModule } from './mailer/email.module';
import { CalculatedFieldsModule } from './calculated-fields/calculated-fields.module';
import { GroupedFieldsModule } from './grouped-fields/grouped-field.module';

@Module({
  imports: [
    PatientsModule,
    UsersModule,
    AuthModule,
    QuestionsModule,
    SurveysModule,
    PrismaModule,
    EmailModule,
    CalculatedFieldsModule,
    GroupedFieldsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
