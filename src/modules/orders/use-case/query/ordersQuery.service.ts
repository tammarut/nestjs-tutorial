import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../../repository/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>
  ) {}

  async findOne(id: number): Promise<OrderEntity | null> {
    // ➢Solution 1: Execute Raw SQL
    //  const queryString = 'SELECT * FROM orders WHERE id = ?';
    //  const order = await this.orderRepository.query(queryString, [id]);

    // ➢Solution 2: ORM method
    // ———————— Single table —————————
    // const order = await this.orderRepository.findOneBy({ id: id });

    // ———————— Join tables —————————
    const order = await this.orderRepository.findOne({
      where: { id: id },
      relations: { orderItems: true },
    });
    if (!order) {
      return null;
    }
    return order;
  }
}
