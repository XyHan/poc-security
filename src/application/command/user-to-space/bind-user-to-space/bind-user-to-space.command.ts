import { CommandInterface } from '../../command.interface';

export class BindUserToSpaceCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _spaceUuid: string;
  private readonly _userUuid: string;
  private readonly _createdBy: string;
  private readonly _permissions: string[];

  constructor(
    spaceUuid: string,
    userUuid: string,
    createdBy: string,
    permissions: string[]
  ) {
    this._spaceUuid = spaceUuid;
    this._userUuid = userUuid;
    this._createdBy = createdBy;
    this._permissions = permissions;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get spaceUuid(): string {
    return this._spaceUuid;
  }

  get userUuid(): string {
    return this._userUuid;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  get permissions(): string[] {
    return this._permissions;
  }
}
