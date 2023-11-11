import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmailService, PrismaService],
    }).compile();

    service = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
