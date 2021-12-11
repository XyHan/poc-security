import { IsDefined, IsNumber } from 'class-validator';

export class CreateASpaceDto {
  objectableUuid: string | null;

  @IsNumber()
  @IsDefined()
  objectableType: number;
}
