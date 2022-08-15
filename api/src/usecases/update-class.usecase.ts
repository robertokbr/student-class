import { ConflictException } from '@nestjs/common';
import { Classes } from '@prisma/client';
import { UpdateClassNameDto } from 'src/domain/dtos/update-class-name.dto';
import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';

export class UpdateClassUsecase {
  constructor(private readonly classesRepository: ClassesRepositoryInterface) {}

  async execute(classId: string, data: UpdateClassNameDto): Promise<Classes> {
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

    return this.classesRepository.update(classId, data);
  }
}
