import { ConflictException } from '@nestjs/common';
import { Classes } from '@prisma/client';
import { CreateClassDto } from '../domain/dtos/create-class.dto';
import { ClassesRepositoryInterface } from '../domain/interfaces/classes-repository.interface';

export class CreateClassUsecase {
  constructor(private readonly classesRepository: ClassesRepositoryInterface) {}

  async execute(data: CreateClassDto): Promise<Classes> {
    const classes = await this.classesRepository.findAll({
      name: data.name,
    });

    if (classes.length > 0) {
      throw new ConflictException('Class already exists');
    }

    return this.classesRepository.create(data);
  }
}
