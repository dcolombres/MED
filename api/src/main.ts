import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que Next.js (puerto 3000) pueda acceder
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  
  // Correr en el puerto 3001, escuchando en todas las interfaces
  await app.listen(3001, '0.0.0.0');
  console.log(`API ME-DIC is running on: http://localhost:3001`);
}
bootstrap();
