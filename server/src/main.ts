import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { bootUpStore } from "./products/data/store";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Api Docs')
    .setDescription('Api Docs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/api-docs', app, document);

  await bootUpStore();
  await app.listen(3000);
}
bootstrap();
