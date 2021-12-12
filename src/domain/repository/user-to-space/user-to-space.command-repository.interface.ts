import { UserToSpaceInterface } from '../../model/security/user-to-space.model';

export interface UserToSpaceCommandRepositoryInterface {
  create(userToSpace: UserToSpaceInterface): Promise<UserToSpaceInterface>;
  delete(userToSpace: UserToSpaceInterface): Promise<void>;
}
