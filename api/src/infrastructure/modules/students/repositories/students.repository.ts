import { Injectable } from '@nestjs/common';
import { Students } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class StudentsRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async findAll(data?: Partial<Students>): Promise<Students[]> {
    return this.prisma.students.findMany({
      where: {
        ...data,
      }
    });
  }

  async create(student: Students): Promise<Students> {
    return this.prisma.students.create({
      data: student,
    });
  }
}
