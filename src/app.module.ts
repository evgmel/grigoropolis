import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
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
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
