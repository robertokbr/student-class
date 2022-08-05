import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('student-class Rest Api documentation.')
  .setVersion('1.0')
  .build();
