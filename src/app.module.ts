import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { LoggerMiddleware } from './infrastructure/middlewares/logger.middleware';
import { OrdersModule } from './modules/orders/orders.module';
import { PhotoModule } from './photos/photos.module';

@Module({
  imports: [
    BooksModule,
    PhotoModule,
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'dev-db.vpc.mercular.com',
      username: 'mercular',
      password: 'dABZe9Z8Yvs1mQKhRC',
      database: 'mercular_operation',
      // entities: [__dirname + '../**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      port: 3306,
      bigNumberStrings: false,
      synchronize: false,
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
