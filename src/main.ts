import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Frontend URL'i
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // DTO'da olmayan field'ları sil
      forbidNonWhitelisted: true, // Extra field gönderilirse hata ver
      transform: true, // String'leri number'a çevir otomatik
    }),
  );



  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
