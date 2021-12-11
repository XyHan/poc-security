import { UserToSpaceInterface, UserToSpaceModel } from '../model/security/user-to-space.model';
import { UserToSpaceFactory } from '../factory/bind-user-to-space.factory';
import { UserFixtures } from './user.fixtures';
import { SpaceFixtures } from './space.fixtures';

export const USER_TO_SPACE_COLLECTION: UserToSpaceInterface[] = [
  new UserToSpaceFactory(new UserToSpaceModel()).generate(
    UserFixtures.userCollection[0],
    SpaceFixtures.spaceCollection[0],
    new Date(),
    'e5155e2a-7035-4160-9338-0b7e3d6bc3ec',
    []
  ),
  new UserToSpaceFactory(new UserToSpaceModel()).generate(
    UserFixtures.userCollection[1],
    SpaceFixtures.spaceCollection[2],
    new Date(),
    null,
    []
  ),
  new UserToSpaceFactory(new UserToSpaceModel()).generate(
    UserFixtures.userCollection[2],
    SpaceFixtures.spaceCollection[1],
    new Date(),
    '6034223a-a3e9-44fe-8088-3a62423c2c34',
    []
  )
];

export class UserToSpaceFixtures {
  private static readonly _userToSpaceCollection: UserToSpaceInterface[] = USER_TO_SPACE_COLLECTION;

  public static get userToSpaceCollection(): UserToSpaceInterface[] {
    return this._userToSpaceCollection;
  }

  public static deleteUserToSpace(userToSpaceToDelete: UserToSpaceInterface): void {
    const index: number = this._userToSpaceCollection.findIndex(
        (userToSpace: UserToSpaceInterface) =>
            (userToSpace.user.uuid === userToSpaceToDelete.user.uuid)
            && (userToSpace.space.uuid === userToSpaceToDelete.space.uuid)
    );
    if (index) this._userToSpaceCollection.splice(index, 1);
  }

  public static saveUserToSpace(userToSpaceToSave: UserToSpaceInterface): void {
    const userToSpaceIndex: number = this._userToSpaceCollection.findIndex(
        (userToSpace: UserToSpaceInterface) =>
            (userToSpace.user.uuid === userToSpaceToSave.user.uuid)
            && (userToSpace.space.uuid === userToSpaceToSave.space.uuid)
    );
    if (userToSpaceIndex) this._userToSpaceCollection.splice(userToSpaceIndex, 1);
    this._userToSpaceCollection.push(userToSpaceToSave);
  }
}
