import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { NewCamper } from '../../domain/camper.domain';
import { CreateCamperDTO } from './create-camper.dto';

@Injectable()
export class CreateACamperCommandService {
  constructor(private readonly eventPublisher: EventPublisher) {}

  execute(createCamperDto: CreateCamperDTO) {
    const { name, age, allergies } = createCamperDto;

    const newCamper = NewCamper('camper-id-01', name, age, allergies);
    this.eventPublisher.mergeObjectContext(newCamper);
    // const newCamper = this.eventPublisher.mergeObjectContext(
    //   NewCamper('camper-id-01', name, age, allergies)
    // );
    console.info('🔥newCamper:', newCamper);
    newCamper.commit();
  }
}
