import { UserInterface } from '../../model/user/user.model';
import { TokenInterface } from '../../model/auth/token.model';

export interface AuthManagerInterface {
  isValidPassword(passwordToCompare: string, passwordToCompareWith: string): Promise<boolean>;
  generateToken(user: UserInterface): TokenInterface;
  isValidUser(token: TokenInterface): Promise<UserInterface | undefined>;
}
