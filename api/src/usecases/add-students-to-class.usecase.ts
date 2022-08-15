import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';
import { AddStudentsToClassDto } from '../domain/dtos/add-students-to-class.dto';
import { ClassStudentModel } from '../domain/models/class-student.model';
import { ConflictException } from '@nestjs/common';
import { ClassWithStudentsDto } from '../domain/dtos/class-with-students.dto';

export class AddStudentsToClassUsecase {
  constructor(private readonly classesRepository: ClassesRepositoryInterface) {}

  async execute(
    classId: string,
    data: AddStudentsToClassDto,
  ): Promise<ClassWithStudentsDto> {
    const conflictingClassRecord =
      await this.classesRepository.findByStudentIds(classId, data.studentIds);

    if (conflictingClassRecord) {
      const students = conflictingClassRecord.students.filter((s) =>
        data.studentIds.includes(s.studentId),
      );

      throw new ConflictException(
        `Students are already added to class: [ ${students
          .map(({ student }) => student.name)
          .join(', ')} ]`,
      );
    }

    const serializedStudentIds = data.studentIds.map((studentId) => ({
      studentId,
    })) as ClassStudentModel[];

    const updatedClass = await this.classesRepository.update(classId, {
      students: serializedStudentIds,
    });

    return new ClassWithStudentsDto(updatedClass);
  }
}
