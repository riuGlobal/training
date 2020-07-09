import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './http-exception-filter';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { UidSecurity } from './validators/repository.validator';

async function bootstrap () {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('training');
  app.useGlobalPipes(new UidSecurity());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
