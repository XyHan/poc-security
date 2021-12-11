import { QueryInterface } from '../../query.interface';

export class LoginQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _email: string;
  private readonly _password: string;

  constructor(email: string, password: string) {
    this._email = email;
    this._password = password;
    this._name = 'login-query';
    this._version = 1.0;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
