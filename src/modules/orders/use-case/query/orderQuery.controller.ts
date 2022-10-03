import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OrdersService } from './ordersQuery.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const result = await this.orderService.findOne(id);
      return result;
    } catch (err) {
      throw err;
    }
  }
}
