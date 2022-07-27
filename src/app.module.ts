import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PhotoModule } from './photos/photos.module';

@Module({
  imports: [BooksModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
