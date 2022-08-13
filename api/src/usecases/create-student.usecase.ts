import { ConflictException } from '@nestjs/common';
import { CreateStudentDto } from '../domain/dtos/create-student.dto';
import { StudentsRepositoryInterface } from '../domain/interfaces/students-repository.interface';

export class CreateStudentUsecase {
  constructor(
    private readonly studentsRepository: StudentsRepositoryInterface,
  ) {}

  async execute(data: CreateStudentDto) {
    const students = await this.studentsRepository.findAll({
      email: data.email,
    });

    if (students.length > 0)
      throw new ConflictException('Student already exists');

    return this.studentsRepository.create(data);
  }
}
