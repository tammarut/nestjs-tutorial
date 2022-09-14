import { HttpStatus, INestApplication } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import NewRequest from 'supertest';
import { BooksModule } from '../../../src/books/books.module';

describe('BookController (End-to-end', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const booksModule = await Test.createTestingModule({
      imports: [BooksModule, EventEmitterModule.forRoot()],
    }).compile();

    app = booksModule.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test('(GET) /books', async () => {
    // Arrange
    const endpoint = '/books';
    // Act
    const response = await NewRequest(app.getHttpServer()).get(endpoint).send();
    // Assert
    expect(response.ok).toBeTruthy();
    expect(response.statusCode).toBe(HttpStatus.OK);
  });
});
