import { TokenInterface } from '../../../domain/model/auth/token.model';
import { Expose } from 'class-transformer';

export class TokenTransformer implements TokenInterface {
  @Expose()
  readonly token: string;
}
