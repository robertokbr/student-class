import { ConflictException } from '@nestjs/common';
import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';
import { ClassModel } from '../domain/models/class.model';
import { UpdateClassUsecase } from './update-class.usecase';

describe('UpdateClassUsecase', () => {
  let usecase: UpdateClassUsecase;

  const mockClass = {
    id: '1',
    name: 'Node.js advanced',
  } as ClassModel;

  const mockClassesRepository = {
    create: jest.fn((_data) => Promise.resolve(mockClass)),
    findAll: jest.fn(() => Promise.resolve([])),
    findByStudentIds: jest.fn(() => Promise.resolve(undefined)),
    update: jest.fn((_id, _data) => Promise.resolve(mockClass)),
  } as ClassesRepositoryInterface;

  beforeEach(async () => {
    usecase = new UpdateClassUsecase(mockClassesRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to update a class name if a class with same name not exists', async () => {
    const result = await usecase.execute(mockClass.id, {
      name: mockClass.name,
    });

    expect(mockClassesRepository.update).toHaveBeenCalledWith(mockClass.id, {
      name: mockClass.name,
    });

    expect(result).toBeTruthy();
  });

  it('should not be able to create a class if a class with same name already exists', async () => {
    mockClassesRepository.findAll = jest.fn(() => Promise.resolve([mockClass]));

    await expect(
      usecase.execute(mockClass.id, {
        name: mockClass.name,
      }),
    ).rejects.toThrow(ConflictException);
  });
});
