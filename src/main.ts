import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/appConfig';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService<AppConfig> = app.get(ConfigService);

  await app.listen(config.get<number>('PORT'));
}

bootstrap();
