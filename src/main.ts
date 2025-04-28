import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { appConfig } from './config/app.config';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const logger = new Logger('Location Tracking API');

  const app = await NestFactory.create(AppModule);
  
  app.enableShutdownHooks();
  
  const config = new DocumentBuilder()
    .setTitle('Location Tracking API')
    .setDescription('Location Tracking API documentation')
    .setVersion('1.0')
    .addTag('locations')
    .addTag('areas')
    .addTag('logs')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(appConfig.port || 3000);
  logger.log(`Server is running on port ${appConfig.port || 3000}`);
}
bootstrap(); 