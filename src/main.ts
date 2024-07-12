import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { FilterUserInterceptor } from './filter-user.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ 
    credentials: true, 
    origin: ['http://localhost:5173', 'https://my-fullstack-task-manager.netlify.app'],
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new FilterUserInterceptor())
  await app.listen(3000);
}
bootstrap();
