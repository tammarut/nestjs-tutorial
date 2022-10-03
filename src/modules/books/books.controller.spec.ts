import { Test, TestingModule } from '@nestjs/testing';
import { BooksController, CreateBookDTO } from './books.controller';
import { BooksService } from './books.service';

const fakeBooksService = {
  getAllBooks: jest.fn(),
  getBook: jest.fn(),
  addNewBook: jest.fn(),
  deleteBook: jest.fn(),
};

describe('BooksController', () => {
  let booksController: BooksController;
  let bookService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: BooksService,
          // useClass: BooksServiceStub,
          useValue: fakeBooksService,
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    bookService = module.get(BooksService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should get all books correctly', async () => {
    // Arrange
    const books = [];
    fakeBooksService.getAllBooks.mockResolvedValueOnce(books);
    // Act
    const allBooks = await booksController.getAllBooks();
    // Assert
    expect(allBooks).toBeTruthy();
    // expect(fakeBooksService.getAllBooks).toHaveBeenCalledTimes(1);
    expect(bookService.getAllBooks).toHaveBeenCalledTimes(1);
  });

  it('should get a book by bookId correctly', async () => {
    // Arrange
    const mockBook = { id: '1' };
    fakeBooksService.getBook.mockResolvedValueOnce(mockBook);
    // Act
    const book = await booksController.getBook('1');
    // Assert
    expect(book).toEqual({ id: '1' });
    expect(bookService.getBook).toHaveBeenCalledTimes(1);
  });

  it('should add a new book correctly', async () => {
    // Arrange
    const newBook: CreateBookDTO = {
      id: 98,
      title: "The Devil's Discus",
      author: 'Prem',
      description: ' King Ra',
    };
    // Act
    await booksController.addNewBook(newBook);
    // Assert
    expect(bookService.addNewBook).toHaveBeenCalledTimes(1);
    expect(bookService.addNewBook).toHaveBeenCalledWith(newBook);
  });

  it('should delete a book correctly', async () => {
    // Arrange
    const bookId = '2';
    // Act
    await booksController.deleteBook({ bookId: bookId });
    // Assert
    expect(bookService.deleteBook).toHaveBeenCalledTimes(1);
    expect(bookService.deleteBook).toHaveBeenCalledWith(bookId);
  });
});
