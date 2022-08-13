import { ConflictException } from '@nestjs/common';
import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';
import { ClassModel } from '../domain/models/class.model';
import { CreateClassUsecase } from './create-class.usecase';

describe('CreateClassUsecase', () => {
  let usecase: CreateClassUsecase;

  const mockClass = {
    id: '1',
    name: 'Node.js advanced',
  } as ClassModel;

  const mockClassesRepository = {
    create: jest.fn((_data) => Promise.resolve(mockClass)),
    findAll: jest.fn(() => Promise.resolve([])),
    findByStudentIds: jest.fn(() => Promise.resolve([])),
    update: jest.fn((_id, _data) => Promise.resolve(mockClass)),
  } as ClassesRepositoryInterface;

  beforeEach(async () => {
    usecase = new CreateClassUsecase(mockClassesRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to create a class if it not exists', async () => {
    const result = await usecase.execute({
      name: mockClass.name,
    });

    expect(mockClassesRepository.create).toHaveBeenCalledWith({
      name: mockClass.name,
    });

    expect(result).toBeTruthy();
  });

  it('should not be able to create a class if it already exists', async () => {
    mockClassesRepository.findAll = jest.fn(() => Promise.resolve([mockClass]));

    await expect(
      usecase.execute({
        name: mockClass.name,
      }),
    ).rejects.toThrow(ConflictException);
  });
});
