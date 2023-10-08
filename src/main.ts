import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  //to use class validation with decorators like IsNotEmpty() and IsString()
  //without the statement above, the class validators don't work.
  //with the class validation, nestjs will generate a descritive response if
  //the request doesn't fit the dto requirements
  await app.listen(3333);
}
bootstrap();
