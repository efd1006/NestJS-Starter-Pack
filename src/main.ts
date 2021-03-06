import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from './shared/environment/environment'
import { HttpExceptionFilter } from './shared/filter/http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { ValidationPipe } from './shared/pipe/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe())
  app.use(helmet());
  app.enableCors();
  if(env.ENVIRONMENT == 'dev') {
    const swaggerOptions = new DocumentBuilder()
    .setTitle('NestJs Template')
    .setDescription('APIs for NestJs Template.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api', app, document);
  }
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per windowMs
    }),
  );
  await app.listen(env.APP_PORT);
}
bootstrap();
