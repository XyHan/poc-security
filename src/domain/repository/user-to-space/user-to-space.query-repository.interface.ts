import { UserToSpaceInterface } from '../../model/security/user-to-space.model';
import { UserInterface } from '../../model/security/user.model';
import { SpaceInterface } from '../../model/security/space.model';

export interface UserToSpaceQueryRepositoryInterface {
  findOneByUserAndSpace(user: UserInterface, space: SpaceInterface, sources: []): Promise<UserToSpaceInterface | null>;
}
