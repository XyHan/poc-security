import { SpaceQueryRepositoryInterface } from '../space.query-repository.interface';
import { SpaceInterface } from '../../../model/security/space.model';
import { SpaceRepositoryException } from '../space.repository.exception';
import { SpaceFixtures } from '../../../fixtures/space.fixtures';

export class SpaceQueryRepositoryMock implements SpaceQueryRepositoryInterface {
  async findOneByUuid(uuid: string): Promise<SpaceInterface | null> {
    const message: string = `SpaceQueryRepository - Error on findOneByUuid space '${uuid}'`;
    if (uuid === 'bad-uuid') throw new SpaceRepositoryException(message);
    try {
      const space: SpaceInterface | undefined = SpaceFixtures
          .spaceCollection
          .find((space: SpaceInterface) => space.uuid === uuid)
      ;
      return space ? Promise.resolve(space) : Promise.resolve(null);
    } catch (e) {
      throw new SpaceRepositoryException(message);
    }
  }

  async findOneByObjectableUuid(objectableUuid: string, sources: any[]): Promise<SpaceInterface | null> {
    const message: string = `SpaceQueryRepository - Error on findOneByObjectableUuid space '${objectableUuid}'`;
    if (objectableUuid === 'bad-objectable-uuid') throw new SpaceRepositoryException(message);
    try {
      const space: SpaceInterface | undefined = SpaceFixtures
          .spaceCollection
          .find((space: SpaceInterface) => space.uuid === objectableUuid)
      ;
      return space ? Promise.resolve(space) : Promise.resolve(null);
    } catch (e) {
      throw new SpaceRepositoryException(message);
    }
  }
}
