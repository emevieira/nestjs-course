import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Swagger - Api Filmes e Séries')
    .setDescription('Essa é uma API de filmes e séries para download')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Emerson Vieira',
      'https://vieiradevcode.com.br',
      'emevieira.dev@gmail.com',
    )
    .addTag('Auth')
    .addTag('Categories')
    .addTag('Movies')
    .addTag('Movie Downloads')
    .addTag('Seasons')
    .addTag('Series')
    .addTag('Users')
    .setBasePath('http://localhost:3333')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
