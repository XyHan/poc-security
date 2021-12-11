import { QueryInterface } from '../../query.interface';

export class GetOneUserByEmailQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _email: string;

  constructor(email: string) {
    this._email = email;
    this._name = 'get-one-user-by-email-query';
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
}
