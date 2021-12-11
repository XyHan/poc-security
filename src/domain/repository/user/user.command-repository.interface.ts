import { UserInterface } from '../../model/user/user.model';

export interface UserCommandRepositoryInterface {
  create(user: UserInterface): Promise<UserInterface>;
  update(user: UserInterface): Promise<UserInterface>;
  delete(user: UserInterface): Promise<UserInterface>;
}
