import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //eslint-disable-next-line
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('debug') 
  postDebugMsg(@Body() body: any) {
    console.log('body:', body, new Date().toISOString());
    return body;
  }
}
