import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalFilters(new HttpExceptionFilter());
  // Aumentar el tamaño máximo permitido para JSON payloads
  app.use(bodyParser.json({ limit: '10mb' })); // Puedes ajustar el límite a 10mb o el valor que necesites
  app.use(bodyParser.urlencoded({ limit: '10mb', extended: true })); // Ajustar para formularios codificados por URL

  await app.listen(port || 5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
