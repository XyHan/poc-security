import { CommandInterface } from '../../command.interface';

export class CreateAUserCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _email: string;
  private readonly _password: string;
  private readonly _createdBy: string;
  private readonly _roles: string[];

  constructor(
    uuid: string,
    email: string,
    password: string,
    createdBy: string,
    roles: string[]
  ) {
    this._uuid = uuid;
    this._email = email;
    this._password = password;
    this._createdBy = createdBy;
    this._roles = roles;
  }

  get uuid(): string {
    return this._uuid;
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

  get createdBy(): string {
    return this._createdBy;
  }

  get roles(): string[] {
    return this._roles;
  }
}
