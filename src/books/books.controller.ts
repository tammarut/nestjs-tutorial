import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';

class CreateBookDTO {
  readonly id: number
  readonly title: string
  readonly description: string
  readonly author: string
}

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) { }

  @Get()
  async getAllBooks() {
    const books = await this.bookService.getAllBooks()
    return books
  }

  @Get(':bookId')
  async getBook(@Param('bookId') bookId: string) {
    const book = await this.bookService.getBook(bookId)
    return book
  }

  @Post()
  async addNewBook(@Body() createBookDTO: CreateBookDTO) {
    const books = await this.bookService.addNewBook(createBookDTO)
    return books
  }

  @Delete()
  async deleteBook(@Query() query: { bookId: string }) {
    const { bookId } = query
    const books = await this.bookService.deleteBook(bookId)
    return books
  }
}
