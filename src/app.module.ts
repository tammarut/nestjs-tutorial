import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './modules/books/books.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PhotoModule } from './photos/photos.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty' },
      },
    }),
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
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}
