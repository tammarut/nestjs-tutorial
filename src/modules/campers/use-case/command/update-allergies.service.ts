import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { ICamperRepository, CAMPER_REPOSITORY } from '../../repository/ICamperRepository';
import { AllergiesCamperDTO } from './update-allergies.dto';

@Injectable()
export class UpdateAllergiesCamperCommandService {
  constructor(
    @Inject(CAMPER_REPOSITORY)
    private readonly camperRepo: ICamperRepository,
    private readonly eventPublisher: EventPublisher
  ) {}

  async execute(camperId: string, allergiesCamperDto: AllergiesCamperDTO) {
    const { allergies } = allergiesCamperDto;
    const camper = await this.camperRepo.findACamperById(camperId);
    if (!camper) {
      throw new NotFoundException(`Not found this camper (camperId=${camperId})`);
    }
    this.eventPublisher.mergeObjectContext(camper);

    camper.updateNewAllergies(allergies);
    await this.camperRepo.findOneAndReplaceById(camperId, camper);
    camper.commit();
  }
}
