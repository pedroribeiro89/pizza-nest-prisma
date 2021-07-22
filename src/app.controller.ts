import { Controller, Get, Param } from "@nestjs/common";
import { Pizza } from '@prisma/client';
import { AppService } from './app.service';
import { PizzaService } from './pizza/pizza.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


}
