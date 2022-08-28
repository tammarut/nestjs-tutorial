import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        BooksService,
        {
          provide: BooksService,
          useValue: () => ({
            getAllBooks: jest.fn().mockResolvedValueOnce([]),
            getBook: jest.fn().mockResolvedValueOnce({}),
            addNewBook: jest.fn().mockResolvedValueOnce([]),
            deleteBook: jest.fn().mockResolvedValueOnce([]),
          }),
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
