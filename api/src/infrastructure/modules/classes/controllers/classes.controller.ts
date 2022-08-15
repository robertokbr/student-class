import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AddStudentsToClassDto } from '../../../../domain/dtos/add-students-to-class.dto';
import { ClassModel } from '../../../../domain/models/class.model';
import { AddStudentsToClassUsecase } from '../../../../usecases/add-students-to-class.usecase';
import { CreateClassDto } from '../../../../domain/dtos/create-class.dto';
import { ClassesRepositoryInterface } from '../../../../domain/interfaces/classes-repository.interface';
import { CreateClassUsecase } from '../../../../usecases/create-class.usecase';
import { ClassWithStudentsDto } from '../../../../domain/dtos/class-with-students.dto';
import { UpdateClassNameDto } from '../../../../domain/dtos/update-class-name.dto';
import { UpdateClassUsecase } from '../../../../usecases/update-class.usecase';

@ApiTags('classes')
@Controller('classes')
export class ClassesController {
  private readonly createClassUsecase: CreateClassUsecase;
  private readonly addStudentsToClassUsecase: AddStudentsToClassUsecase;
  private readonly updateClassUsecase: UpdateClassUsecase;

  constructor(
    @Inject('ClassesRepository')
    private readonly classesRepository: ClassesRepositoryInterface,
  ) {
    this.createClassUsecase = new CreateClassUsecase(classesRepository);
    this.updateClassUsecase = new UpdateClassUsecase(classesRepository);
    this.addStudentsToClassUsecase = new AddStudentsToClassUsecase(
      classesRepository,
    );
  }

  @Post('/')
  async create(@Body() data: CreateClassDto) {
    return this.createClassUsecase.execute(data);
  }

  @Get('/')
  async findAll(@Query() data: Partial<ClassModel>) {
    const classes = await this.classesRepository.findAll(data);
    return classes.map((classData) => new ClassWithStudentsDto(classData));
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateClassNameDto) {
    return this.updateClassUsecase.execute(id, data);
  }

  @Patch('/:id/students')
  async updateClassStudents(
    @Param('id') id: string,
    @Body() data: AddStudentsToClassDto,
  ) {
    return this.addStudentsToClassUsecase.execute(id, data);
  }
}
