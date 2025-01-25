import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const PREFIX = configService.get<string>('app.prefix');

  app.setGlobalPrefix(PREFIX);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const config = new DocumentBuilder()
    .setTitle('API _LRR | BOOKDEW')
    .setDescription('API')
    .setVersion('0.0.1')
    .addCookieAuth('access_token', {
      type: 'apiKey',
      in: 'cookie',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const PORT = configService.get<number>('app.port');

  await app.listen(PORT);
}
bootstrap();
