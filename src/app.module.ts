import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzaService } from './pizza/pizza.service';
import { PrismaService } from './prisma/prisma.service';
import { PizzaModule } from './pizza/pizza.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PizzaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
