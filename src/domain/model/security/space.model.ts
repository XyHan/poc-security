export const spaceTypeGlobal = 0;
export const spaceTypePeople = 1;
export const spaceTypeCompany = 2;

export interface SpaceInterface {
  uuid: string;
  status: number;
  objectableType: number;
  objectableUuid: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}

export class SpaceModel implements SpaceInterface {
  protected _uuid: string;
  protected _status: number;
  protected _objectableType: number;
  protected _objectableUuid: string;
  protected _createdAt: Date;
  protected _createdBy: string;
  protected _updatedAt: Date;
  protected _updatedBy: string;

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
  }

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get objectableType(): number {
    return this._objectableType;
  }

  set objectableType(value: number) {
    this._objectableType = value;
  }

  get objectableUuid(): string {
    return this._objectableUuid;
  }

  set objectableUuid(value: string) {
    this._objectableUuid = value;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  set createdAt(value: Date) {
    this._createdAt = value;
  }

  get createdBy(): string {
    return this._createdBy;
  }

  set createdBy(value: string) {
    this._createdBy = value;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  get updatedBy(): string {
    return this._updatedBy;
  }

  set updatedBy(value: string) {
    this._updatedBy = value;
  }
}
