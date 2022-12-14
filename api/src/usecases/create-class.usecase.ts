import { ConflictException } from '@nestjs/common';
import { ClassWithStudentsDto } from '../domain/dtos/class-with-students.dto';
import { CreateClassDto } from '../domain/dtos/create-class.dto';
import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';

export class CreateClassUsecase {
  constructor(private readonly classesRepository: ClassesRepositoryInterface) {}

  async execute(data: CreateClassDto): Promise<ClassWithStudentsDto> {
    if (data.name) {
      const [conflictingClassRecord] = await this.classesRepository.findAll({
        name: data.name,
      });

      if (conflictingClassRecord) {
        throw new ConflictException(
          `Class with name ${data.name} already exists`,
        );
      }
    }

    const newClass = await this.classesRepository.create(data);

    return new ClassWithStudentsDto(newClass);
  }
}
