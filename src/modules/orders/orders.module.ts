import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './repository/order.entity';
import { OrderItemEntity } from './repository/orderItem.entity';
import { OrdersController } from './use-case/query/orderQuery.controller';
import { OrdersService } from './use-case/query/ordersQuery.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderItemEntity])],
  providers: [OrdersService],
  controllers: [OrdersController],
})
export class OrdersModule {}
