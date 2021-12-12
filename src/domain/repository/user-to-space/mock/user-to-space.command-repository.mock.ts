import { UserToSpaceCommandRepositoryInterface } from '../user-to-space.command-repository.interface';
import { UserToSpaceInterface } from '../../../model/security/user-to-space.model';
import { UserToSpaceFixtures } from '../../../fixtures/user-to-space.fixtures';
import { UserToSpaceRepositoryException } from '../user-to-space.repository.exception';

export class UserToSpaceCommandRepositoryMock implements UserToSpaceCommandRepositoryInterface {
  public async create(userToSpace: UserToSpaceInterface): Promise<UserToSpaceInterface> {
    this.isValidUserToSpace(userToSpace);
    try {
      UserToSpaceFixtures.saveUserToSpace(userToSpace);
      return Promise.resolve(userToSpace);
    } catch (e) {
      const message: string = `UserToSpaceCommandRepository - Error on create userToSpace '${userToSpace.user.uuid}'`;
      throw new UserToSpaceRepositoryException(message);
    }
  }

  public async delete(userToSpace: UserToSpaceInterface): Promise<void> {
    try {
      UserToSpaceFixtures.deleteUserToSpace(userToSpace);
      return Promise.resolve();
    } catch (e) {
      const message: string = `UserToSpaceCommandRepository - Error on delete userToSpace '${userToSpace.user.uuid}'`;
      throw new UserToSpaceRepositoryException(message);
    }
  }

  private isValidUserToSpace(userToSpace: UserToSpaceInterface): boolean {
    if (!userToSpace.user?.uuid?.length || !userToSpace.space?.uuid?.length) {
      const message: string = `UserToSpaceCommandRepository - Error on create userToSpace '${userToSpace.user.uuid}' - user uuid and space uuid cannot be empty`;
      throw new UserToSpaceRepositoryException(message);
    }
    return true;
  }
}
