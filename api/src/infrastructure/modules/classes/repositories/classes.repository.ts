import { Injectable } from '@nestjs/common';
import { Classes, ClassStudents } from '@prisma/client';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class ClassesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(data?: Partial<Classes>): Promise<Classes[]> {
    return this.prisma.classes.findMany({
      where: {
        ...data,
      },
      include: {
        students: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  async create(classModel: Classes): Promise<Classes> {
    return this.prisma.classes.create({
      data: classModel,
    });
  }

  async update(
    id: string,
    data: Partial<Classes & { students: ClassStudents[] }>,
  ): Promise<Classes> {
    const { students, ...dto } = data;

    return this.prisma.classes.update({
      where: {
        id,
      },
      data: {
        ...dto,
        students: {
          createMany: {
            data: students.map((s) => ({
              ...s,
            })),
          },
        },
      },
      include: {
        students: {
          include: {
            student: true,
          },
        },
      },
    });
  }

  async findByStudentIds(ids: string[]): Promise<Classes[]> {
    return this.prisma.classes.findMany({
      where: {
        students: {
          some: {
            studentId: {
              in: ids,
            },
          },
        },
      },
    });
  }
}
