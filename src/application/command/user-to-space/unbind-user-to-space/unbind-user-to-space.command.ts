import { CommandInterface } from '../../command.interface';

export class UnbindUserToSpaceCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _spaceUuid: string;
  private readonly _userUuid: string;

  constructor(spaceUuid: string, userUuid: string) {
    this._spaceUuid = spaceUuid;
    this._userUuid = userUuid;
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
}
