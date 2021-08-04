import { Module } from '@nestjs/common';
import { HashmanController } from './hashman.controller';
import { HashmanService } from './hashman.service';
import { ConfigService } from '@nestjs/config';
import AppConfig from '../config/interfaces/appConfig.interface';
import {
  DECODER_INTERFACE,
  ENCODER_INTERFACE,
  HASHMAN_SECRET_KEY,
} from '../constants';

@Module({
  controllers: [HashmanController],
  providers: [
    HashmanService,
    {
      provide: HASHMAN_SECRET_KEY,
      useFactory: (configService: ConfigService) =>
        configService.get<AppConfig>(HASHMAN_SECRET_KEY),
      inject: [ConfigService],
    },
    {
      provide: ENCODER_INTERFACE,
      useExisting: HashmanService,
    },
    {
      provide: DECODER_INTERFACE,
      useExisting: HashmanService,
    },
  ],
  imports: [ConfigService],
})
export class HashmanModule {}
