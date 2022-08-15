import { Global, Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { pinoConfig } from '../../../infrastructure/configs/pino.config';
import { StudentsController } from './controllers/students.controller';
import { StudentsRepository } from './repositories/students.repository';

@Global()
@Module({
  imports: [LoggerModule.forRoot(pinoConfig)],
  controllers: [StudentsController],
  providers: [
    {
      provide: 'StudentsRepository',
      useClass: StudentsRepository,
    },
  ],
  exports: ['StudentsRepository'],
})
export class StudentsModule {}
