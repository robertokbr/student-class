import { PickType } from "@nestjs/swagger";
import { ClassModel } from "../models/class.model";

export class CreateClassDto extends PickType(ClassModel, [
  "name",
]) {}
