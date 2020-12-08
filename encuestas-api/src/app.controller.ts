import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('controlTotal')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('holaMundito')
  getHello(): string {
    return this.appService.getHello();
  }
}
