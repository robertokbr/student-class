import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsDate } from 'class-validator';
import { ClassModel } from '../models/class.model';
import { StudentModel } from '../models/student.model';

export class ClassWithStudentsDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsArray()
  students: StudentModel[];

  @ApiProperty()
  @IsDate()
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  updatedAt: Date;

  constructor({ students, ...data }: ClassModel) {
    Object.assign(this, {
      ...data,
      students: students?.map((s) => s.student) || [],
    });
  }
}
