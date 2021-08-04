import { Module } from '@nestjs/common';
import { HashmanController } from './hashman.controller';
import { HashmanService } from './hashman.service';
import { ConfigService } from '@nestjs/config';
import AppConfig from '../config/interfaces/appConfig.interface';
import {
  CRYPTOGRAPHER,
  DECODER,
  ENCODER,
  HASHMAN_SECRET_KEY,
} from '../constants';
import { DefaultCryptographerService } from './cryptographer/default-cryptographer.service';

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
      provide: ENCODER,
      useExisting: HashmanService,
    },
    {
      provide: DECODER,
      useExisting: HashmanService,
    },
    // {
    //   provide: CRYPTOGRAPHER,
    //   useClass: DefaultCryptographerService,
    // },
  ],
  imports: [ConfigService],
})
export class HashmanModule {}
