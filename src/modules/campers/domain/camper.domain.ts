import { AggregateRoot } from '@nestjs/cqrs';
import { CamperCreatedEvent } from '../event/camper-created/camper-created.event';

export class Camper extends AggregateRoot {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _age: number;
  private _allergies: string[];

  constructor(id: string, name: string, age: number, allergies: string[]) {
    super();
    this._id = id;
    this._name = name;
    this._age = age;
    this._allergies = allergies;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get age() {
    return this._age;
  }

  get allergies(): readonly string[] {
    return this._allergies;
  }

  updateNewAllergies(newAllergies: string[]): void {
    const allergiesLowerCase = newAllergies.map((allergy) => allergy.toLocaleLowerCase());
    if (allergiesLowerCase.includes('chocolate')) {
      throw new Error('Allergy should not include chocolate');
    }
    this._allergies = newAllergies;
  }
}

// func NewCamper is a factory function
export function NewCamper(id: string, name: string, age: number, allergies: string[]): Camper {
  const newCamper = new Camper(id, name, age, allergies);
  newCamper.apply(new CamperCreatedEvent(newCamper.id));

  return newCamper;
}
