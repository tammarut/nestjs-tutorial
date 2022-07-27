import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let bookService: BooksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BooksService],
    }).compile();

    bookService = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(bookService).toBeDefined();
  });
});
