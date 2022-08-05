import { IsArray, IsOptional, IsString } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';
import { BaseModel } from "./base.model";
import { ClassStudentModel } from "./class-student.model";

export class StudentModel extends BaseModel {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  classes: ClassStudentModel[];
}
