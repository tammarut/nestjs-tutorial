import { IsNotEmpty, IsString } from 'class-validator';

export class AllergiesCamperDTO {
  @IsString({ each: true })
  @IsNotEmpty()
  readonly allergies: string[];
}
