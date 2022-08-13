import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { ClassesRepository } from './classes.repository';

describe('ClassesRepository', () => {
  let provider: ClassesRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClassesRepository,
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    provider = module.get<ClassesRepository>(ClassesRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
