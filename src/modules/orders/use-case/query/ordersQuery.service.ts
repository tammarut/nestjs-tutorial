import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../repository/order.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async findOne(id: number): Promise<OrderEntity | null> {
    this.logger.log(`Receive orderId: ${id}`);
    // ➢Solution 1: Execute Raw SQL
    //  const queryString = 'SELECT * FROM orders WHERE id = ?';
    //  const order = await this.orderRepository.query(queryString, [id]);

    // ➢Solution 2: ORM method
    // ———————— Single table —————————
    // const order = await this.orderRepository.findOneBy({ id: id });

    // ———————— Join tables —————————
    try {
      const order = await this.orderRepository.findOne({
        where: { id: id },
        relations: { orderItems: true },
      });
      if (!order) {
        this.logger.error({ id: 'query-order-error' }, `Not found this orderId (${id})`);
        throw new Error(`Not found this orderId ${id}`);
      }
      return order;
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw err;
    }
  }
}
