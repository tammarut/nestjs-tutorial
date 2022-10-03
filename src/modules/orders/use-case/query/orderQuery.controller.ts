import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './ordersQuery.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.orderService.findOne(id);
  }
}
