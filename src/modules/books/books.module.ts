import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookEventEmitter, BOOK_EVENT_PUBLISHER } from './publisher/IBookEventPublisher';

@Module({
  controllers: [BooksController],
  providers: [BooksService, { provide: BOOK_EVENT_PUBLISHER, useClass: BookEventEmitter }],
})
export class BooksModule {}
