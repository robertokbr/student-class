import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerConfig } from './infrastructure/configs/swagger.config';
import { AllExceptionFilter } from './infrastructure/common/filters/exceptions-logger.filter';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { Logger as PinoLogger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  app.enableCors();

  app.useLogger(app.get(PinoLogger));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      // whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new LoggingInterceptor(app.get(PinoLogger)));

  app.useGlobalFilters(
    new AllExceptionFilter(app.get(PinoLogger), app.get(HttpAdapterHost)),
  );

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
