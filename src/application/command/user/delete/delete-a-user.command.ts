import { CommandInterface } from '../../command.interface';

export class DeleteAUserCommand implements CommandInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _updatedBy: string;

  constructor(uuid: string, updatedBy: string) {
    this._uuid = uuid;
    this._updatedBy = updatedBy;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get uuid(): string {
    return this._uuid;
  }

  get updatedBy(): string {
    return this._updatedBy;
  }
}
