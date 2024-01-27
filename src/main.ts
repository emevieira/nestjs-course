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
    .setTitle('Swagger - Api Tech Filmes')
    .setDescription('Essa api é do site Tech Filmes')
    .setVersion('1.0')
    .addBearerAuth()
    .setContact(
      'Emerson Vieira',
      'https://vieiradevcode.com.br',
      'emevieira.dev@gmail.com',
    )
    .addTag('auth')
    .addTag('downloads')
    .addTag('movies')
    .addTag('users')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3333);
}
bootstrap();
