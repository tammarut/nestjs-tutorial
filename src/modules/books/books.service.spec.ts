import { ConsoleLogger } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { BooksService } from './books.service';
import { BOOK_EVENT_PUBLISHER, IBookEventPublisher } from './publisher/IBookEventPublisher';

class BookPublisherStub implements IBookEventPublisher {
  private readonly logger = new ConsoleLogger();

  publishBookCreatedEvent(book: {
    id: number;
    title: string;
    description: string;
    author: string;
  }): void {
    this.logger.log('BookPublisherStub:', book);
  }
}

describe('BooksService', () => {
  let bookService: BooksService;
  let bookEventPublisher: IBookEventPublisher;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BooksService, { provide: BOOK_EVENT_PUBLISHER, useClass: BookPublisherStub }],
    }).compile();

    bookService = module.get(BooksService);
    bookEventPublisher = module.get<IBookEventPublisher>(BOOK_EVENT_PUBLISHER);
  });

  it('should return all books', async () => {
    // Arrange
    // Act
    const books = await bookService.getAllBooks();
    // Assert
    expect(books).toHaveLength(6);
  });

  it('should return a specific book by bookID', async () => {
    // Arrange
    const bookId = '1';
    // Act
    const book = await bookService.getBook(bookId);
    // Assert
    expect(book.id).toBe(Number.parseInt(bookId));
  });

  it('getBook by bookID, it should throw NotFoundException', async () => {
    // Arrange
    const bookId = '0';
    // Act
    const testFn = async () => await bookService.getBook(bookId);
    // Assert
    await expect(testFn()).rejects.toThrowError('This bookId is not exist!');
  });

  it('addNewBook, it should add a new book correctly', async () => {
    // Arrange
    const publishEventSpy = jest.spyOn(bookEventPublisher, 'publishBookCreatedEvent');
    const newBook = { id: 99, title: 'OnePiece' };
    // Act
    const allBooks = await bookService.addNewBook(newBook);
    // Assert
    expect(allBooks).toBeTruthy();
    expect(publishEventSpy).toHaveBeenNthCalledWith(1, newBook);
  });

  it('deleteBook by bookID, it should be deleted correctly', async () => {
    // Arrange
    const bookId = '1';
    const allBooksBefore = bookService.allBooks.length;
    // Act
    const allBooksAfter: any = await bookService.deleteBook(bookId);
    // Assert
    expect(allBooksAfter.length).toBeLessThan(allBooksBefore);
  });

  it('deleteBook by bookID not found, it should throw NotFoundException', async () => {
    // Arrange
    const bookId = '0';
    // Act
    const testFn = async () => await bookService.deleteBook(bookId);
    // Assert
    await expect(testFn()).rejects.toThrowError('This bookId is not exist!');
  });
});
