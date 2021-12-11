import { SpaceInterface } from '../../model/security/space.model';

export interface SpaceCommandRepositoryInterface {
  create(Space: SpaceInterface): Promise<SpaceInterface>;
  update(Space: SpaceInterface): Promise<SpaceInterface>;
  delete(Space: SpaceInterface): Promise<SpaceInterface>;
}
