import { Global, Module } from '@nestjs/common';
import { ClassesController } from './controllers/classes.controller';
import { ClassesRepository } from './repositories/classes.repository';

@Global()
@Module({
  controllers: [ClassesController],
  providers: [
    {
      provide: 'ClassesRepository',
      useClass: ClassesRepository,
    },
  ],
  exports: ['ClassesRepository'],
})
export class ClassesModule {}
