import { CommandInterface } from '../../command.interface';

export class ChangePasswordCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _password: string;
  private readonly _updatedBy: string;
  private readonly _uuid: string;

  constructor(
    password: string,
    updatedBy: string,
    uuid: string,
  ) {
    this._password = password;
    this._updatedBy = updatedBy;
    this._uuid = uuid;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get password(): string {
    return this._password;
  }

  get updatedBy(): string {
    return this._updatedBy;
  }

  get uuid(): string {
    return this._uuid;
  }
}
