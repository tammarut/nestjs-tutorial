import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { OrderEntity } from './order.entity';

@Entity('order_items')
export class OrderItemEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column('int')
  readonly order_id: number;

  @Column('int')
  readonly master_data_id: number;

  @Column('int')
  readonly quantity: number;

  @ManyToOne(() => OrderEntity, (order) => order.orderItems)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id' })
  readonly order: OrderEntity;
}
