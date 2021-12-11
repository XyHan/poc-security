import { UserInterface } from '../../model/security/user.model';

export interface UserCommandRepositoryInterface {
  create(user: UserInterface): Promise<UserInterface>;
  update(user: UserInterface): Promise<UserInterface>;
  delete(user: UserInterface): Promise<UserInterface>;
}
