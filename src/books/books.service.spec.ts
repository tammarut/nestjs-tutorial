import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BOOK_EVENT_PUBLISHER, IBookEventPublisher } from './publisher/IBookEventPublisher';

class BookPublisherStub implements IBookEventPublisher {
  publishBookCreatedEvent(book: {
    id: number;
    title: string;
    description: string;
    author: string;
  }): void {
    console.info('BookPublisherStub:', book);
  }
}

describe('BooksService', () => {
  let bookService: BooksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BooksService, { provide: BOOK_EVENT_PUBLISHER, useClass: BookPublisherStub }],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });
});
