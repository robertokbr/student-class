import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../../app.module';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { StudentsController } from '../../controllers/students.controller';

describe('StudentsController (int)', () => {
  let app: INestApplication;
  let studentsController: StudentsController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();

    studentsController = app.get(StudentsController);
  });

  describe('create', () => {
    it('should create a student', async () => {
      const { name } = await studentsController.create({
        name: 'Test Student',
        email: 'test@email.com',
      });

      expect(name).toBe('Test Student');
    });

    it('should not be able to create a student if there is a student with the same name', async () => {
      await studentsController.create({
        name: 'Test Student',
        email: 'test@email.com',
      });

      await expect(
        studentsController.create({
          name: 'Test Student',
          email: 'test@email.com',
        }),
      ).rejects.toThrowError('Student with name Test Student already exists');
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const students = await studentsController.findAll({});

      expect(students).toBeInstanceOf(Array);
    });
  });
});
