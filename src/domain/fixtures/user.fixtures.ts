import { UserInterface, UserModel } from '../model/security/user.model';
import { UserFactory } from '../factory/user.factory';

export const USER_COLLECTION: UserInterface[] = [
  new UserFactory(new UserModel()).generate(
    '5e4e03a6-6e6f-4b39-a158-307d1e9082d8',
    1,
    'user1@test.com',
    'password1',
    'salt1',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    ['ADMIN']
  ),
  new UserFactory(new UserModel()).generate(
    '0d66db91-4441-4563-967c-797d767c7288',
    1,
    'user2@test.com',
    'password2',
    'salt2',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    ['USER']
  ),
  new UserFactory(new UserModel()).generate(
    'b51b7315-d7ba-49b1-ad7d-ea4c8167b3d0',
    1,
    'user3@test.com',
    'password3',
    'salt3',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    new Date(),
    'c9f63e25-bd06-42ae-993c-20b6b236cb84',
    ['BAD_ROLE']
  )
];

export class UserFixtures {
  private static readonly _userCollection: UserInterface[] = USER_COLLECTION;

  public static get userCollection(): UserInterface[] {
    return this._userCollection;
  }

  public static deleteUser(userToDelete: UserInterface): void {
    const index: number = this._userCollection.findIndex((user: UserInterface) => user.uuid === userToDelete.uuid);
    if (index) this._userCollection.splice(index, 1);
  }

  public static saveUser(userToSave: UserInterface): void {
    const userIndex: number = this._userCollection.findIndex((user: UserInterface) => user.uuid === userToSave.uuid);
    if (userIndex) this._userCollection.splice(userIndex, 1);
    this._userCollection.push(userToSave);
  }
}
