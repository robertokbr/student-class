import { Global, Module } from '@nestjs/common';
import { StudentsController } from './controllers/students.controller';
import { StudentsRepository } from './repositories/students.repository';

@Global()
@Module({
  controllers: [StudentsController],
  providers: [{
    provide: 'StudentsRepository',
    useClass: StudentsRepository,
  }],
  exports: ['StudentsRepository'],
})
export class StudentsModule {}
