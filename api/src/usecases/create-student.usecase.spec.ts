import { ConflictException } from "@nestjs/common";
import { StudentModel } from "../domain/models/student.model";
import { StudentsRepositoryInterface } from "../domain/interfaces/students-repository.interface";
import { CreateStudentUsecase } from "./create-student.usecase";

describe('CreateStudentUsecase', () => {
  let usecase: CreateStudentUsecase;

  const mockStudent = {
    id: '1',
    name: 'John Doe',
    email: 'john@email.com',
  } as StudentModel;

  const mockStudentsRepository: StudentsRepositoryInterface = {
    findAll: jest.fn(
      (_data) => Promise.resolve([]),
    ),
    create: jest.fn(
      (_data) => Promise.resolve(mockStudent)
    ),
  };

  beforeEach(async () => {
    usecase = new CreateStudentUsecase(mockStudentsRepository);
  });

  it('should be defined', () => {
    expect(usecase).toBeDefined();
  });

  it('should be able to create a student if it not exists', async () => {
    const result = await usecase.execute({
      name: mockStudent.name,
      email: mockStudent.email,
    });

    expect(mockStudentsRepository.create).toHaveBeenCalledWith({
      name: mockStudent.name,
      email: mockStudent.email,
    });

    expect(mockStudentsRepository.findAll).toHaveBeenCalledWith({
      email: mockStudent.email,
    });

    expect(result).toBe(mockStudent);
  });

  it('should not be able to create a student if it already exists', async () => {
    mockStudentsRepository.findAll = jest.fn(
      () => Promise.resolve([mockStudent])
    );

    await expect(usecase.execute({
      name: mockStudent.name,
      email: mockStudent.email,
    })).rejects.toThrow(ConflictException);
  });
});
