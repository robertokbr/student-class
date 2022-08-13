import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';
import { AddStudentsToClassDto } from '../domain/dtos/add-students-to-class.dto';
import { ClassStudentModel } from '../domain/models/class-student.model';
import { ConflictException } from '@nestjs/common';
import { ClassWithStudentsDto } from 'src/domain/dtos/class-with-students.dto';

export class AddStudentsToClassUsecase {
  constructor(private readonly classesRepository: ClassesRepositoryInterface) {}

  async execute(
    classId: string,
    data: AddStudentsToClassDto,
  ): Promise<ClassWithStudentsDto> {
    const classStudents = await this.classesRepository.findByStudentIds(
      data.studentIds,
    );

    if (classStudents.length > 0) {
      throw new ConflictException(
        `Students with ids [${classStudents
          .map((s) => s.id)
          .join(', ')}] are already added to class`,
      );
    }

    const students = data.studentIds.map((studentId) => ({
      studentId,
    })) as ClassStudentModel[];

    const classStudent = await this.classesRepository.update(classId, {
      students,
    });

    return new ClassWithStudentsDto(classStudent);
  }
}
