import { IsDefined, IsNumber } from 'class-validator';

export class CreateASpaceDto {
  @IsDefined()
  objectableUuid: string | null;

  @IsNumber()
  @IsDefined()
  objectableType: number;
}
