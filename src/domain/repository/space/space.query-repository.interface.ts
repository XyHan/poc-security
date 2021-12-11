import { SpaceInterface } from '../../model/security/space.model';

export interface SpaceQueryRepositoryInterface {
  findOneByUuid(uuid: string, sources: string[]): Promise<SpaceInterface | null>;
  findOneByObjectableUuid(objectableUuid: string, sources: string[]): Promise<SpaceInterface | null>;
}
