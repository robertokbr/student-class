import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../../../app.module';
import { PrismaService } from '../../../../database/prisma/prisma.service';
import { ClassesController } from '../../controllers/classes.controller';

describe('ClassesController (int)', () => {
  let app: INestApplication;
  let classesController: ClassesController;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prismaService = app.get(PrismaService);
    await prismaService.cleanDatabase();

    classesController = app.get(ClassesController);
  });

  describe('create', () => {
    it('should create a class', async () => {
      const { name } = await classesController.create({
        name: 'Test Class',
      });

      expect(name).toBe('Test Class');
    });

    it('should not be able to create a class if there is a class with the same name', async () => {
      await classesController.create({
        name: 'Test Class',
      });

      await expect(
        classesController.create({
          name: 'Test Class',
        }),
      ).rejects.toThrowError('Class with name Test Class already exists');
    });
  });

  describe('findAll', () => {
    it('should return an array of classes', async () => {
      const classes = await classesController.findAll({});

      expect(classes).toBeInstanceOf(Array);
    });
  });

  describe('update', () => {
    it('should be able to update a class', async () => {
      const { id } = await classesController.create({
        name: 'Test Class',
      });

      const { name: newName } = await classesController.update(id, {
        name: 'New Test Class',
      });

      expect(newName).toBe('New Test Class');
    });

    it('should not be able to update a class if there is a class with the same name', async () => {
      await classesController.create({
        name: 'Test Class',
      });

      await expect(
        classesController.update('1', {
          name: 'Test Class',
        }),
      ).rejects.toThrowError('Class with name Test Class already exists');
    });
  });

  describe('updateClassStudents', () => {
    it('should be able to update a class students', async () => {
      const student = await prismaService.students.create({
        data: {
          name: 'Student 1',
          email: 'student1@email.com',
        },
      });

      const { id } = await classesController.create({
        name: 'Test Class',
      });

      const { students } = await classesController.updateClassStudents(id, {
        studentIds: [student.id],
      });

      expect(students).toBeInstanceOf(Array);
    });

    it('should not be able to update a class students if there is a class with the same name', async () => {
      const student = await prismaService.students.create({
        data: {
          name: 'Student 1',
          email: 'student1@email.com',
        },
      });

      const { id } = await classesController.create({
        name: 'Test Class',
      });

      await classesController.updateClassStudents(id, {
        studentIds: [student.id],
      });

      await expect(
        classesController.updateClassStudents(id, {
          studentIds: [student.id],
        }),
      ).rejects.toThrowError(
        'Students are already added to class: [ Student 1 ]',
      );
    });
  });
});
