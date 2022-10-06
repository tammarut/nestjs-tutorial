import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import fs from 'fs';
import { LoggerModule } from 'nestjs-pino';
import path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { loadConfigsFromEnv } from './config';
import { BooksModule } from './modules/books/books.module';
import { EmployeesModule } from './modules/employees/employees.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PhotoModule } from './photos/photos.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [loadConfigsFromEnv] }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: { target: 'pino-pretty', options: { singleLine: true } },
      },
    }),
    EventEmitterModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('DATABASE.HOST'),
          username: configService.get('DATABASE.USERNAME'),
          password: configService.get('DATABASE.PASSWORD'),
          database: configService.get('DATABASE.DB_NAME'),
          entities: [path.join(__dirname, './**/*.entity.{js,ts}')],
          // entities: [__dirname + '../**/*.entity{.ts,.js}'],
          port: configService.get('DATABASE.PORT'),
          ssl: {
            ca: fs.readFileSync('cacert-2022-07-19.pem'),
          },
          bigNumberStrings: false,
          synchronize: false,
          logging: true,
        };
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DATABASE_HOST,
    //   username: process.env.DATABASE_USERNAME,
    //   password: process.env.DATABASE_PASSWORD,
    //   database: process.env.DATABASE_NAME,
    //   entities: [path.join(__dirname, './**/*.entity.{js,ts}')],
    //   // entities: [__dirname + '../**/*.entity{.ts,.js}'],
    //   port: Number.parseInt(process.env.DATABASE_PORT),
    //   ssl: {
    //     ca: fs.readFileSync('cacert-2022-07-19.pem'),
    //   },
    //   bigNumberStrings: false,
    //   synchronize: false,
    //   logging: true,
    // }),
    BooksModule,
    PhotoModule,
    OrdersModule,
    EmployeesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}
