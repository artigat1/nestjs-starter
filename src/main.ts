import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule, AUTH_GUARD } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // app.useGlobalGuards(new AuthGuard());
  const authGuard = app.select(AppModule).get(AUTH_GUARD);
  app.useGlobalGuards(authGuard);

  await app.listen(3000);
}
bootstrap();
