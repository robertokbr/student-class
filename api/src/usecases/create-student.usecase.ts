import { ConflictException } from '@nestjs/common';
import { CreateStudentDto } from '../domain/dtos/create-student.dto';
import { StudentsRepositoryInterface } from '../domain/interfaces/students-repository.interface';

export class CreateStudentUsecase {
  constructor(
    private readonly studentsRepository: StudentsRepositoryInterface,
  ) {}

  async execute(data: CreateStudentDto) {
    const [conflictingStudentRecord] = await this.studentsRepository.findAll({
      email: data.email,
    });

    if (conflictingStudentRecord)
      throw new ConflictException(
        `Student with email ${data.email} already exists`,
      );

    return this.studentsRepository.create(data);
  }
}
