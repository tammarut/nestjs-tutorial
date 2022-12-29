import { Camper } from '../domain/camper.domain';

export const CAMPER_REPOSITORY = 'CamperRepository';

export interface ICamperRepository {
  findACamperById(camperId: string): Promise<Camper | null>;
  findOneAndReplaceById(camperId: string, camper: Camper): Promise<void>;
}
