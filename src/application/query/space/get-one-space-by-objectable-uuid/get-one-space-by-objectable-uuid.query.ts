import { QueryInterface } from '../../query.interface';

export class GetOneSpaceByObjectableUuidQuery implements QueryInterface {
  private readonly _name: string;
  private readonly _version: number;
  private readonly _objectableUuid: string;
  private readonly _sources: string[];

  constructor(objectableUuid: string, sources: string[]) {
    this._objectableUuid = objectableUuid;
    this._sources = sources;
    this._name = 'get-one-space-by-objectable-uuid-query';
    this._version = 1.0;
  }

  get name(): string {
    return this._name;
  }

  get version(): number {
    return this._version;
  }

  get objectableUuid(): string {
    return this._objectableUuid;
  }

  get sources(): string[] {
    return this._sources;
  }
}
