import { UserToSpaceQueryRepositoryInterface } from '../user-to-space.query-repository.interface';
import { UserToSpaceInterface } from '../../../model/security/user-to-space.model';
import { UserToSpaceRepositoryException } from '../user-to-space.repository.exception';
import { UserToSpaceFixtures } from '../../../fixtures/user-to-space.fixtures';
import { SpaceInterface } from '../../../model/security/space.model';
import { UserInterface } from '../../../model/security/user.model';

export class UserToSpaceQueryRepositoryMock implements UserToSpaceQueryRepositoryInterface {
  async findOneByUserAndSpace(user: UserInterface, space: SpaceInterface, sources: []): Promise<UserToSpaceInterface | null> {
    const message: string = `UserToSpaceQueryRepository - Error on findOneByUserUuidAndSpaceUuid user ${user.uuid} & space ${space.uuid}`;
    if (user.uuid === 'bad-user-uuid' && space.uuid === 'bad-space-uuid') throw new UserToSpaceRepositoryException(message);
    try {
      const userToSpaceBinding: UserToSpaceInterface | undefined = UserToSpaceFixtures
          .userToSpaceCollection
          .find((userToSpace: UserToSpaceInterface) => (userToSpace.user.uuid === user.uuid) && (userToSpace.space.uuid === space.uuid));
      return userToSpaceBinding ? Promise.resolve(userToSpaceBinding) : Promise.resolve(null);
    } catch (e) {
      throw new UserToSpaceRepositoryException(message);
    }
  }
}
