import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderItemEntity } from './orderItem.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'varchar' })
  readonly order_status: string;

  @Column({ type: 'varchar' })
  readonly payment_method: string;

  @OneToMany(() => OrderItemEntity, (item) => item.order)
  @JoinColumn({ referencedColumnName: 'order_id' })
  readonly orderItems: OrderItemEntity[];
}
