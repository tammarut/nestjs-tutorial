import { HttpStatus, INestApplication } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test } from '@nestjs/testing';
import NewRequest from 'supertest';
import { BooksModule } from '../../../src/books/books.module';

describe('BookController (End-to-end)', () => {
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

  describe('GET /books to get all books', () => {
    // Arrange
    const endpoint = '/books';
    test('Response status should be 200(OK)', async () => {
      // Act
      const response = await NewRequest(app.getHttpServer()).get(endpoint).send();
      // Assert
      expect(response.ok).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.OK);
    });

    test('Content-Type should be json in response header', async () => {
      // Act
      const response = await NewRequest(app.getHttpServer()).get(endpoint).send();
      // Assert
      expect(response.headers['content-type']).toContain('json');
    });

    test('Response body should be array', async () => {
      // Act
      const response = await NewRequest(app.getHttpServer()).get(endpoint).send();
      // Assert
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('GET /books/:bookId to get a book by bookId', () => {
    describe('✅Happy cases', () => {
      // Arrange
      const endpoint = '/books/2';
      test('Response status should be 200(OK)', async () => {
        const request = NewRequest(app.getHttpServer()).get(endpoint);

        // Act
        const response = await request.send();
        // const response = await NewRequest(app.getHttpServer()).get(endpoint).send();

        // Assert
        expect(response.ok).toBeTruthy();
        expect(response.statusCode).toEqual(HttpStatus.OK);
      });

      test('Content-Type should be json in response header', async () => {
        const request = NewRequest(app.getHttpServer()).get(endpoint);
        // Act
        const response = await request.send();
        // Assert
        expect(response.headers['content-type']).toContain('json');
      });

      test('Response body should be an object', async () => {
        const request = NewRequest(app.getHttpServer()).get(endpoint);
        // Act
        const response = await request.send();
        // Assert
        expect(response.body).toBeInstanceOf(Object);
        expect(response.body.id).toEqual(2);
      });
    });

    describe('❌Failed cases', () => {
      describe('When not found this bookID', () => {
        // Arrange
        const bookId = 0;
        const endpoint = '/books/' + bookId;
        test('Response status should be 404(Not Found)', async () => {
          const request = NewRequest(app.getHttpServer()).get(endpoint);
          // Act
          const response = await request.send();
          // Assert
          expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
        });

        test('Content-Type should be json in response header', async () => {
          const request = NewRequest(app.getHttpServer()).get(endpoint);
          // Act
          const response = await request.send();
          // Assert
          expect(response.headers['content-type']).toContain('json');
        });

        test('Response body should be valid', async () => {
          const request = NewRequest(app.getHttpServer()).get(endpoint);
          // Act
          const response = await request.send();
          // Assert
          expect(response.body.message).toEqual('This bookId is not exist!');
        });
      });
    });
  });

  describe('POST /books to add a new book', () => {
    // Arrange
    const endpoint = '/books';
    test('Response status should be 201(Created)', async () => {
      const requestBody = {
        id: 70,
        title: 'Devil Judge',
        description: 'Korean movie',
        author: 'John woo',
      };
      const request = NewRequest(app.getHttpServer()).post(endpoint);
      // Act
      const response = await request.send(requestBody);
      // Assert
      expect(response.ok).toBeTruthy();
      expect(response.statusCode).toBe(HttpStatus.CREATED);
    });
  });

  describe('DELETE /books?bookId to delete a book by bookId', () => {
    const endpoint = '/books';
    describe('✅Happy cases', () => {
      test('Response status should be 200(OK)', async () => {
        const bookId = { bookId: '1' };
        const queryParams = '?' + new URLSearchParams(bookId).toString();

        const request = NewRequest(app.getHttpServer()).delete(endpoint + queryParams);
        // Act
        const response = await request.send();
        // Assert
        expect(response.statusCode).toBe(HttpStatus.OK);
      });
    });

    describe('❌Failed cases', () => {
      describe('When not found this bookID', () => {
        // Arrange
        const bookId = { bookId: '0' };
        const queryParams = '?' + new URLSearchParams(bookId).toString();
        test('Response status should be 404(Not Found)', async () => {
          const request = NewRequest(app.getHttpServer()).delete(endpoint + queryParams);
          // Act
          const response = await request.send();
          // Assert
          expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
        });
        test('Content-Type should be json in response header', async () => {
          const request = NewRequest(app.getHttpServer()).delete(endpoint + queryParams);
          // Act
          const response = await request.send();
          // Assert
          expect(response.headers['content-type']).toContain('json');
        });
        test('Response body should be valid', async () => {
          // Assert
          const request = NewRequest(app.getHttpServer()).delete(endpoint + queryParams);
          // Act
          const response = await request.send();
          // Assert
          expect(response.body.message).toEqual('This bookId is not exist!');
        });
      });
    });
  });
});
