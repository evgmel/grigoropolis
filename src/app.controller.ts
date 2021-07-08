import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { JoiValidationPipe } from './pipes/validation/JoiValidationPipe';
import { userNameSchema } from './schemas/app.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UsePipes(new JoiValidationPipe(userNameSchema))
  getHello(@Query('name') userName: string): string {
    return this.appService.getHello(userName);
  }
}
