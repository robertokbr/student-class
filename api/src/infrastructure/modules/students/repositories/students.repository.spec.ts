import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { StudentsRepository } from './students.repository';

describe('StudentsRepository', () => {
  let provider: StudentsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsRepository,
        {
          provide: PrismaService,
          useValue: {},
        }
      ],
    }).compile();

    provider = module.get<StudentsRepository>(StudentsRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
