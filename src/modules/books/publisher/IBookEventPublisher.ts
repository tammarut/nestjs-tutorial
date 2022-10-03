import { Books } from '../books.service';

type Book = Books[0];

export interface IBookEventPublisher {
  publishBookCreatedEvent(book: Book): void;
}

export const BOOK_EVENT_PUBLISHER = 'BOOK_EVENT_PUBLISHER';
export * from './adapter/bookEventEmitter.adapter';
