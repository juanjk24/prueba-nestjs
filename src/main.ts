import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SERVER_PORT } from './config/constans';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const configService = app.get(ConfigService)

  const PORT = configService.get<number>(SERVER_PORT) || 3000

  await app.listen(PORT);
  console.log(`Servidor corriendo en el puerto: http://localhost:${PORT}`);
  
}

bootstrap();
