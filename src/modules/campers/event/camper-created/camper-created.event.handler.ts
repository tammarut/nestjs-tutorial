import { IEventHandler, EventsHandler } from '@nestjs/cqrs';
import { CamperCreatedEvent } from './camper-created.event';

@EventsHandler(CamperCreatedEvent)
export class CamperCreatedEventHandler implements IEventHandler<CamperCreatedEvent> {
  handle(event: CamperCreatedEvent) {
    console.debug('🤜CamperCreatedEvent', event);
  }
}
