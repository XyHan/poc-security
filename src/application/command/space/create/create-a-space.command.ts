import { CommandInterface } from '../../command.interface';

export class CreateASpaceCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _userUuid: string;
  private readonly _objectableType: number;
  private readonly _objectableUuid: string | null;

  constructor(
    uuid: string,
    userUuid: string,
    objectableUuid: string | null,
    objectableType: number
  ) {
    this._uuid = uuid;
    this._userUuid = userUuid;
    this._objectableUuid= objectableUuid;
    this._objectableType = objectableType;
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

  get userUuid(): string {
    return this._userUuid;
  }

  get objectableType(): number {
    return this._objectableType;
  }

  get objectableUuid(): string | null {
    return this._objectableUuid;
  }
}
