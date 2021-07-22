import { Controller, Get, Logger, Param, Query } from "@nestjs/common";
import { Pizza } from '@prisma/client';
import { PizzaService } from './pizza.service';

@Controller('pizzas')
export class PizzaController {
  private readonly logger = new Logger(PizzaController.name);

  constructor(private readonly pizzaService: PizzaService) {}

  @Get()
  async findAll(@Query('vegs') vegs: boolean = false): Promise<Pizza[]> {
    if (vegs) {
      this.logger.log('vegs');
      return this.pizzaService.vegPizzas();
    }
    this.logger.log('normal');
    return this.pizzaService.pizzas({});
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Pizza> {
    return this.pizzaService.pizza({ id: Number(id) });
  }

  // @Get('vegs')
  // async findVegs(): Promise<Pizza[]> {
  //   this.logger.log('foi');
  //   return this.pizzaService.vegPizzas();
  // }

  // @Get('/vegs')
  // async findVegs() {
  //   console.log('teste');
  // }
}
