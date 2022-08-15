import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, MinLength } from 'class-validator';
import { BaseModel } from './base.model';
import { ClassStudentModel } from './class-student.model';

export class ClassModel extends BaseModel {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  students: ClassStudentModel[];
}
