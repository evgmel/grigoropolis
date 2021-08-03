import { Module } from '@nestjs/common';
import { HashmanController } from './hashman.controller';
import { HashmanService } from './hashman.service';
import { ConfigService } from '@nestjs/config';
import AppConfig from '../config/interfaces/appConfig.interface';

const hashmanSecretProvider = {
  provide: 'HASHMAN_SECRET_KEY',
  useFactory: (configService: ConfigService) =>
    configService.get<AppConfig>('HASHMAN_SECRET_KEY'),
  inject: [ConfigService],
};

@Module({
  controllers: [HashmanController],
  providers: [hashmanSecretProvider, HashmanService],
})
export class HashmanModule {}
