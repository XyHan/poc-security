import { SpaceInterface, SpaceModel } from '../model/security/space.model';
import { SpaceFactory } from '../factory/space.factory';

export const SPACE_COLLECTION: SpaceInterface[] = [
  new SpaceFactory(new SpaceModel()).generate(
    '5e4e03a6-6e6f-4b39-a158-307d1e9082d8',
    1,
    1,
    'e5155e2a-7035-4160-9338-0b7e3d6bc3ec',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84'
  ),
  new SpaceFactory(new SpaceModel()).generate(
    '0d66db91-4441-4563-967c-797d767c7288',
    1,
    0,
    null,
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84'
  ),
  new SpaceFactory(new SpaceModel()).generate(
    'b51b7315-d7ba-49b1-ad7d-ea4c8167b3d0',
    1,
    2,
    '6034223a-a3e9-44fe-8088-3a62423c2c34',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84'
  )
];

export class SpaceFixtures {
  private static readonly _spaceCollection: SpaceInterface[] = SPACE_COLLECTION;

  public static get spaceCollection(): SpaceInterface[] {
    return this._spaceCollection;
  }

  public static deleteSpace(spaceToDelete: SpaceInterface): void {
    const index: number = this._spaceCollection.findIndex((space: SpaceInterface) => space.uuid === spaceToDelete.uuid);
    if (index) this._spaceCollection.splice(index, 1);
  }

  public static saveSpace(spaceToSave: SpaceInterface): void {
    const spaceIndex: number = this._spaceCollection.findIndex((space: SpaceInterface) => space.uuid === spaceToSave.uuid);
    if (spaceIndex) this._spaceCollection.splice(spaceIndex, 1);
    this._spaceCollection.push(spaceToSave);
  }
}
