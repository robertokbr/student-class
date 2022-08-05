import { Test, TestingModule } from '@nestjs/testing';
import { ClassesRepository } from '../repositories/classes.repository';
import { ClassesController } from './classes.controller';

describe('ClassesController', () => {
  let controller: ClassesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        ClassesController
      ],
      providers: [{
        provide: 'ClassesRepository',
        useValue: {},
      }],
    }).compile();

    controller = module.get<ClassesController>(ClassesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
