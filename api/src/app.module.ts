import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './infrastructure/database/database.module';
import { ClassesModule } from './infrastructure/modules/classes/classes.module';
import { StudentsModule } from './infrastructure/modules/students/students.module';

@Module({
  imports: [DatabaseModule, StudentsModule, ClassesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
