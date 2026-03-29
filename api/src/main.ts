import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que Next.js (puerto 3000) pueda acceder
  app.enableCORS();
  
  // Correr en el puerto 3001
  await app.listen(3001);
  console.log(`Application is running on: http://localhost:3001`);
}
bootstrap();
