import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BOOK_EVENT_PUBLISHER } from './events/IBookEventPublisher';
import { BookEventEmitter } from './events/newBookAdded.event';

@Module({
  controllers: [BooksController],
  providers: [BooksService, { provide: BOOK_EVENT_PUBLISHER, useClass: BookEventEmitter }],
})
export class BooksModule {}
