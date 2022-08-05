import { Body, Controller, Get, Inject, Param, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddStudentsToClassDto } from '../../../../domain/dtos/add-students-to-class.dto';
import { ClassModel } from '../../../../domain/models/class.model';
import { AddStudentsToClassUsecase } from '../../../../usecases/add-students-to-class.usecase';
import { CreateClassDto } from '../../../../domain/dtos/create-class.dto';
import { ClassesRepositoryInterface } from '../../../../domain/interfaces/classes-repository.interface';
import { CreateClassUsecase } from '../../../../usecases/create-class.usecase';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  constructor(
    @Inject('ClassesRepository')
    private readonly classesRepository: ClassesRepositoryInterface,
  ) {}

  @Post('/')
  async create(@Body() data: CreateClassDto) {
    const createClassUsecase = new CreateClassUsecase(this.classesRepository);

    return createClassUsecase.execute(data);
  }

  @Get('/')
  async findAll(@Query() data: Partial<ClassModel>) {
    return this.classesRepository.findAll(data);
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() data: AddStudentsToClassDto) {
    const addStudentsToClassUsecase = new AddStudentsToClassUsecase(this.classesRepository);

    return addStudentsToClassUsecase.execute(id, data);
  }
}
