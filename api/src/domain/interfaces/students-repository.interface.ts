import { CreateStudentDto } from '../dtos/create-student.dto';
import { StudentModel } from '../models/student.model';

export interface StudentsRepositoryInterface {
  findAll(data: Partial<StudentModel>): Promise<StudentModel[]>;
  create(student: CreateStudentDto): Promise<StudentModel>;
}
