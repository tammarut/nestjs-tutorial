import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import fs from 'fs';
import { ConfigSchema } from 'src/config';
import { Repository } from 'typeorm';
import { OrderEntity } from '../repository/order.entity';
import { OrderItemEntity } from '../repository/orderItem.entity';
import { OrdersService } from '../use-case/query/ordersQuery.service';

describe('OrdersService Integration test', () => {
  let ordersService: OrdersService;
  let orderRepo: Repository<OrderEntity>;
  let orderItemRepo: Repository<OrderItemEntity>;
  let testingModule: TestingModule;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService<ConfigSchema>) => {
            return {
              type: 'mysql',
              host: configService.get('DATABASE_HOST'),
              username: configService.get('DATABASE_USERNAME'),
              password: configService.get('DATABASE_PASSWORD'),
              database: configService.get('DATABASE_NAME'),
              entities: [OrderEntity, OrderItemEntity],
              port: configService.get('DATABASE_PORT'),
              ssl: {
                ca: fs.readFileSync('cacert-2022-07-19.pem'),
              },
              bigNumberStrings: false,
              synchronize: false,
              logging: false,
            };
          },
        }),

        TypeOrmModule.forFeature([OrderEntity, OrderItemEntity]),
      ],
      providers: [OrdersService],
    }).compile();

    ordersService = module.get(OrdersService);
    orderRepo = module.get(getRepositoryToken(OrderEntity));
    orderItemRepo = module.get(getRepositoryToken(OrderItemEntity));

    testingModule = module;
  });

  afterAll(async () => {
    await testingModule.close();
  });

  describe('findOne', () => {
    test('should find an order by id completely', async () => {
      // Arrange
      const orderStub = orderRepo.create({
        id: 99,
        order_status: 'IN_PROCESS',
        payment_method: 'qr',
      });
      await orderRepo.save(orderStub);
      const orderItemStub = orderItemRepo.create({ order_id: orderStub.id, master_data_id: 38, quantity: 1 });
      await orderItemRepo.save(orderItemStub);

      const orderId = orderStub.id;
      // Act
      const order = await ordersService.findOne(orderId);
      // Assert
      expect(order.id).toEqual(orderId);
      expect(order.order_status).toEqual(orderStub.order_status);
      expect(order.payment_method).toEqual(orderStub.payment_method);
    });
  });
});
