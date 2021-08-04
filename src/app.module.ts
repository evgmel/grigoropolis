import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HashmanModule } from './hashman/hashman.module';
import configuration from './config/appConfig';
import validationSchema from './config/schema/appConfigValidation.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      load: [configuration],
      validationOptions: {
        abortEarly: true,
      },
      isGlobal: true,
    }),
    HashmanModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
