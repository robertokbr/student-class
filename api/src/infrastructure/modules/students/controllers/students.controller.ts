import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateStudentDto } from '../../../../domain/dtos/create-student.dto';
import { StudentsRepositoryInterface } from '../../../../domain/interfaces/students-repository.interface';
import { StudentModel } from '../../../../domain/models/student.model';
import { CreateStudentUsecase } from '../../../../usecases/create-student.usecase';

@ApiTags('students')
@Controller('students')
export class StudentsController {
  private readonly createStudentUsecase: CreateStudentUsecase;

  constructor(
    @Inject('StudentsRepository')
    private readonly studentsRepository: StudentsRepositoryInterface,
  ) {
    this.createStudentUsecase = new CreateStudentUsecase(studentsRepository);
  }

  @Post('/')
  async create(@Body() data: CreateStudentDto) {
    return this.createStudentUsecase.execute(data);
  }

  @Get('/')
  async findAll(@Query() data: Partial<StudentModel>) {
    return this.studentsRepository.findAll(data);
  }
}
