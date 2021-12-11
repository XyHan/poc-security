import { UserInterface } from '../../model/security/user.model';

export interface UserQueryRepositoryInterface {
  findOneByUuid(uuid: string, sources: string[]): Promise<UserInterface | null>;
  findOneByEmail(email: string): Promise<UserInterface | null>;
}
