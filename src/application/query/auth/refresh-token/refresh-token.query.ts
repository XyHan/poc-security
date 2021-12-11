import { QueryInterface } from '../../query.interface';
import { TokenInterface } from '../../../../domain/model/auth/token.model';

export class RefreshTokenQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _token: TokenInterface;

  constructor(token: TokenInterface) {
    this._token = token;
    this._name = 'refresh-token-query';
    this._version = 1.0;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get token(): TokenInterface {
    return this._token;
  }
}
