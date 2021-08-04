import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import AppConfig from './config/interfaces/appConfig.interface';
import { APP_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config: ConfigService<AppConfig> = app.get(ConfigService);

  await app.listen(config.get<number>(APP_PORT));
}

bootstrap();
