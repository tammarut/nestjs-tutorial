import { Controller, Post, HttpCode, HttpStatus, Body, Param, Patch } from '@nestjs/common';
import { CreateCamperDTO } from './use-case/command/create-camper.dto';
import { CreateACamperCommandService } from './use-case/command/create-new-camper.service';
import { AllergiesCamperDTO } from './use-case/command/update-allergies.dto';
import { UpdateAllergiesCamperCommandService } from './use-case/command/update-allergies.service';

@Controller('campers')
export class CampersController {
  constructor(
    private readonly createCamperCommandService: CreateACamperCommandService,
    private readonly updateAllergiesCamperCommandService: UpdateAllergiesCamperCommandService
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createANewCamper(@Body() createCamperDTO: CreateCamperDTO) {
    this.createCamperCommandService.execute(createCamperDTO);
  }

  @Patch('/:camperId/allergies')
  async updateAllergiesCamper(@Param('camperId') camperId: string, @Body() dto: AllergiesCamperDTO) {
    await this.updateAllergiesCamperCommandService.execute(camperId, dto);
  }
}
