import { UserCommandRepositoryInterface } from '../user.command-repository.interface';
import { UserInterface } from '../../../model/user/user.model';
import { UserRepositoryException } from '../user.repository.exception';
import { UserFixtures } from '../../../fixtures/user.fixtures';

export class UserCommandRepositoryMock implements UserCommandRepositoryInterface {
  public async create(user: UserInterface): Promise<UserInterface> {
    this.isValidUser(user);
    try {
      UserFixtures.saveUser(user);
      return Promise.resolve(user);
    } catch (e) {
      const message: string = `UserCommandRepository - Error on create user '${user.uuid}'`;
      throw new UserRepositoryException(message);
    }
  }

  public async delete(user: UserInterface): Promise<UserInterface> {
    try {
      UserFixtures.deleteUser(user);
      return Promise.resolve(user);
    } catch (e) {
      const message: string = `UserCommandRepository - Error on delete user '${user.uuid}'`;
      throw new UserRepositoryException(message);
    }
  }

  public async update(user: UserInterface): Promise<UserInterface> {
    this.isValidUser(user);
    try {
      UserFixtures.saveUser(user);
      return Promise.resolve(user);
    } catch (e) {
      const message: string = `UserCommandRepository - Error on update user '${user.uuid}'`;
      throw new UserRepositoryException(message);
    }
  }

  private isValidUser(user: UserInterface): boolean {
    if (!user.email.length || !user.uuid.length || !user.password.length) {
      const message: string = `UserCommandRepository - Error on create user '${user.uuid}' - email, uuid and password cannot be empty`;
      throw new UserRepositoryException(message);
    }
    return true;
  }
}
