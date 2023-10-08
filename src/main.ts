import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
    }
  ))
  //the ValidationPipe can remove fields not expected in your dto with whitelist:true
  //this is interesting to avoid inserting malicious variables into your code.
  //with this alteration, only the expected fields are passed through
  await app.listen(3333);
}
bootstrap();
