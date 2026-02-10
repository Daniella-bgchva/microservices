import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
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
      .setTitle('Todo Service')
      .setDescription('Second microservice - resource server')
      .setVersion('1.0')
      .addBearerAuth()
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 8021;
  await app.listen(port);

  Logger.log(`Server running on http://localhost:${port}`);
  Logger.log(`Swagger available at http://localhost:${port}/api/docs`);
}

bootstrap();
