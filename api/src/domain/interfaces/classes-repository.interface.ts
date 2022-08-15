import { CreateClassDto } from '../dtos/create-class.dto';
import { ClassModel } from '../models/class.model';

export interface ClassesRepositoryInterface {
  findAll(data: Partial<ClassModel>): Promise<ClassModel[]>;
  findByStudentIds(id: string, studentIds: string[]): Promise<ClassModel>;
  create(classModel: CreateClassDto): Promise<ClassModel>;
  update(id: string, data: Partial<ClassModel>): Promise<ClassModel>;
}
