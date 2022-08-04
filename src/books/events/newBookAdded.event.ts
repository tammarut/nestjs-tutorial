import { Books } from '../books.service';

type Book = Books[0];

export class NewBookAddedEvent {
  constructor(public readonly book: Book) {}
}
