import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { SchemaValidationPipe } from './pipes/validation/schema-validation-pipe.service';
import { userNameSchema } from './app.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes(new SchemaValidationPipe(userNameSchema))
  getHello(@Query('name') userName: string): string {
    return this.appService.getHello(userName);
  }
}
