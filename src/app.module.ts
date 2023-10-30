import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PatientsModule } from './patients/patients.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [PatientsModule, UsersModule, AuthModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
