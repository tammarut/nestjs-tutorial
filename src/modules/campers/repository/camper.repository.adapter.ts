import { Camper } from '../domain/camper.domain';
import { ICamperRepository } from './ICamperRepository';

interface CamperEntity {
  _id: string;
  name: string;
  age: number;
  allergies: string[];
}

function toCamperDomain(camperEntity: CamperEntity): Camper {
  return new Camper(camperEntity._id, camperEntity.name, camperEntity.age, camperEntity.allergies);
}

export class CamperRepositoryAdapter implements ICamperRepository {
  private readonly campersMemory: CamperEntity[] = [{ _id: 'camper-01', name: 'Alice', age: 18, allergies: ['Mint'] }];

  async findACamperById(camperId: string): Promise<Camper | null> {
    const camper = this.campersMemory.find((camper) => camper._id === camperId);
    if (!camper) return await Promise.resolve(null);

    const camperDomain = toCamperDomain(camper);
    return await Promise.resolve(camperDomain);
  }

  async findOneAndReplaceById(camperId: string, camper: Camper): Promise<void> {
    const camperFound = this.campersMemory.find((camper) => camper._id === camperId);
    console.debug('before campersMemory', this.campersMemory);
    if (!camperFound) {
      return await Promise.resolve();
    }
    camperFound.name = camper.name;
    camperFound.age = camper.age;
    camperFound.allergies = camper.allergies as string[];
    console.debug('after campersMemory', this.campersMemory);
  }
}
