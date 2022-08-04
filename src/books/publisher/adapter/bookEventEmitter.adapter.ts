import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { Books } from 'src/books/books.service';
import { NewBookAddedEvent } from 'src/books/events/newBookAdded.event';
import { setTimeout } from 'timers/promises';
import { IBookEventPublisher } from '../IBookEventPublisher';

type Book = Books[0];

@Injectable()
export class BookEventEmitter implements IBookEventPublisher {
  private readonly logger = new Logger();

  constructor(private readonly eventEmitter: EventEmitter2) {}

  publishBookCreatedEvent(book: Book) {
    const successful = this.eventEmitter.emit('book.created', new NewBookAddedEvent(book));
    this.logger.log(`publishedEvent=${successful}`);
  }

  @OnEvent('book.created')
  protected onNewBookAdded(event: NewBookAddedEvent) {
    this.logger.log(`New book added: ${JSON.stringify(event.book, null, 2)}`);
  }

  @OnEvent('book.created', { async: true })
  protected async sendEmail(event: NewBookAddedEvent) {
    this.logger.log(`Sending email to ${event.book.author}`);
    const resp = await setTimeout(5000, 'Email sent');
    this.logger.log(resp);
  }
}
