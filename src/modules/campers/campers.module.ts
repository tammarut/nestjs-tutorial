import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CampersController } from './campers.controller';
import { CamperCreatedEventHandler } from './event/camper-created/camper-created.event.handler';
import { CamperRepositoryAdapter } from './repository/camper.repository.adapter';
import { CAMPER_REPOSITORY } from './repository/ICamperRepository';
import { CreateACamperCommandService } from './use-case/command/create-new-camper.service';
import { UpdateAllergiesCamperCommandService } from './use-case/command/update-allergies.service';

@Module({
  imports: [CqrsModule],
  controllers: [CampersController],
  providers: [
    CreateACamperCommandService,
    UpdateAllergiesCamperCommandService,
    CamperCreatedEventHandler,
    { provide: CAMPER_REPOSITORY, useClass: CamperRepositoryAdapter },
  ],
})
export class CampersModule {}
