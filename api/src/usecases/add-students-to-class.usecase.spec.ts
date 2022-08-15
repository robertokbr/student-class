import { ConflictException } from '@nestjs/common';
import { ClassesRepositoryInterface } from 'src/domain/interfaces/classes-repository.interface';
import { ClassModel } from 'src/domain/models/class.model';
import { AddStudentsToClassUsecase } from './add-students-to-class.usecase';

describe('AddStudentsToClassUsecase', () => {
  let usecase: AddStudentsToClassUsecase;

  const mockClass = {
    id: '1',
    name: 'Node.js advanced',
  } as ClassModel;

  const mockClassesRepository = {
    create: jest.fn((_data) => Promise.resolve(mockClass)),
    findAll: jest.fn(() => Promise.resolve([])),
    findByStudentIds: jest.fn(() => Promise.resolve(undefined)),
    update: jest.fn((_id, data) => Promise.resolve(data)),
  } as ClassesRepositoryInterface;

  beforeEach(async () => {
    usecase = new AddStudentsToClassUsecase(mockClassesRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to add students to class', async () => {
    const result = await usecase.execute('1', {
      studentIds: ['1', '2'],
    });

    expect(mockClassesRepository.findByStudentIds).toHaveBeenCalledWith([
      '1',
      '2',
    ]);
    expect(mockClassesRepository.update).toHaveBeenCalledWith(mockClass.id, {
      students: ['1', '2'].map((id) => ({ studentId: id })),
    });

    expect(result).toBeTruthy();
  });

  it('should not be able to add students to class if they are already added', async () => {
    mockClassesRepository.findByStudentIds = jest.fn(() =>
      Promise.resolve(mockClass),
    );

    await expect(
      usecase.execute('1', {
        studentIds: ['1', '2'],
      }),
    ).rejects.toThrow(ConflictException);
  });
});
