import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class AddStudentsToClassDto {
  @ApiProperty()
  @IsArray()
  studentIds: string[];
}
