import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Pizza, Prisma } from '@prisma/client';

@Injectable()
export class PizzaService {
  constructor(private prisma: PrismaService) {}

  async pizza(pizzaWhereUniqueInput: Prisma.PizzaWhereUniqueInput,): Promise<Pizza | null> {
    return this.prisma.pizza.findUnique({ where: pizzaWhereUniqueInput, });
  }

  async pizzas(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PizzaWhereUniqueInput;
    where?: Prisma.PizzaWhereInput;
    orderBy?: Prisma.PizzaOrderByInput;
  }): Promise<Pizza[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.pizza.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async vegPizzas(): Promise<Pizza[]> {
    return await this.prisma.$queryRaw<Pizza[]>(
      ` SELECT p.*
        FROM Pizza p
        WHERE
           (SELECT Count(*) FROM PizzaIngredient WHERE pizzaId = p.id)
           =
           (SELECT Count(*) FROM PizzaIngredient pi JOIN Ingredient i on i.id = pi.ingredientId
            WHERE pi.pizzaId = p.id AND i.veg IS TRUE);
      `,
    );
  }

  async createPizza(data: Prisma.PizzaCreateInput): Promise<Pizza> {
    return this.prisma.pizza.create({ data, });
  }

  async updateUser(params: {
    where: Prisma.PizzaWhereUniqueInput;
    data: Prisma.PizzaUpdateInput;
  }): Promise<Pizza> {
    const { where, data } = params;
    return this.prisma.pizza.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.PizzaWhereUniqueInput): Promise<Pizza> {
    return this.prisma.pizza.delete({
      where,
    });
  }
}
