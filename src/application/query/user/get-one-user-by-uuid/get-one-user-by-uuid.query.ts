import { QueryInterface } from '../../query.interface';

export class GetOneUserByUuidQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _uuid: string;
  private readonly _sources: string[];

  constructor(uuid: string, sources: string[]) {
    this._uuid = uuid;
    this._sources = sources;
    this._name = 'get-one-user-by-uuid-query';
    this._version = 1.0;
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

  get sources(): string[] {
    return this._sources;
  }
}
