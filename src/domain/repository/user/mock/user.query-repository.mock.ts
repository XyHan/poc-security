import { UserQueryRepositoryInterface } from '../user.query-repository.interface';
import { UserInterface } from '../../../model/user/user.model';
import { UserRepositoryException } from '../user.repository.exception';
import { UserFixtures } from '../../../fixtures/user.fixtures';

export class UserQueryRepositoryMock implements UserQueryRepositoryInterface {
  async findOneByEmail(email: string): Promise<UserInterface | null> {
    const message: string = `UserQueryRepository - Error on findOneByEmail user '${email}'`;
    if (email === 'bad-email') throw new UserRepositoryException(message);
    try {
      const user: UserInterface | undefined = UserFixtures.userCollection.find((user: UserInterface) => user.email === email);
      return user ? Promise.resolve(user) : Promise.resolve(null);
    } catch (e) {
      throw new UserRepositoryException(message);
    }
  }

  async findOneByUuid(uuid: string, sources: any[]): Promise<UserInterface | null> {
    const message: string = `UserQueryRepository - Error on findOneByUuid user '${uuid}'`;
    if (uuid === 'bad-uuid') throw new UserRepositoryException(message);
    try {
      const user: UserInterface | undefined = UserFixtures.userCollection.find((user: UserInterface) => user.uuid === uuid);
      return user ? Promise.resolve(user) : Promise.resolve(null);
    } catch (e) {
      throw new UserRepositoryException(message);
    }
  }
}
