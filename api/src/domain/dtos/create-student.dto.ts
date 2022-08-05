import { PickType } from "@nestjs/swagger";
import { StudentModel } from "../models/student.model";

export class CreateStudentDto extends PickType(StudentModel, ["name", "email"]) {}
