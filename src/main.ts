import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3333);
  //changing the port to 3333 cuz 3000 can be used by React
}
bootstrap();
