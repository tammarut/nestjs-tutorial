import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateCamperDTO {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly age: number;

  @IsArray()
  readonly allergies: string[];
}
