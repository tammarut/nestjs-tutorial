import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BOOKS } from './mocks/books.mock';
import { BOOK_EVENT_PUBLISHER, IBookEventPublisher } from './publisher/IBookEventPublisher';

export type Books = typeof BOOKS;
type ABook = Books[0];

@Injectable()
export class BooksService {
  private books: Books = BOOKS;

  constructor(
    @Inject(BOOK_EVENT_PUBLISHER)
    private readonly bookEventPublisher: IBookEventPublisher
  ) {}

  get allBooks(): Readonly<Books> {
    return this.books;
  }

  async getAllBooks(): Promise<Books> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  async getBook(bookId: string): Promise<ABook> {
    return new Promise((resolve) => {
      const book = this.books.find((book) => book.id === Number.parseInt(bookId));
      if (!book) {
        throw new NotFoundException('This bookId is not exist!');
      }
      resolve(book);
    });
  }

  async addNewBook(book: any): Promise<Books> {
    return new Promise((resolve) => {
      this.books.push(book);
      // this.eventEmitter.emit('books.created', new NewBookAddedEvent(book));
      this.bookEventPublisher.publishBookCreatedEvent(book);
      resolve(this.books);
    });
  }

  async deleteBook(bookId: string) {
    return new Promise((resolve) => {
      const index = this.books.findIndex((book) => book.id === Number.parseInt(bookId));
      if (index < 0) {
        throw new NotFoundException('This bookId is not exist!');
      }
      this.books.splice(index, 1);
      resolve(this.books);
    });
  }
}
