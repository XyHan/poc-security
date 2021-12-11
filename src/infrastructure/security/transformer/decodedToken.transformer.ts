import { Expose } from 'class-transformer';
import { DecodedTokenInterface } from '../../../domain/model/auth/decoded-token.model';

export class DecodedTokenTransformer implements DecodedTokenInterface {
  @Expose()
  readonly email: string;

  @Expose()
  readonly exp: string;

  @Expose()
  readonly iat: string;

  @Expose()
  readonly uuid: string;
}
