export interface UserInterface {
  uuid: string;
  status: number;
  password: string;
  salt: string;
  email: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  roles: string[];
}

export class UserModel implements UserInterface {
  protected _email: string;
  protected _password: string;
  protected _salt: string;
  protected _uuid: string;
  protected _createdAt: Date;
  protected _createdBy: string;
  protected _updatedAt: Date;
  protected _updatedBy: string;
  protected _status: number;
  private _roles: string[];

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get salt(): string {
    return this._salt;
  }

  set salt(value: string) {
    this._salt = value;
  }

  get uuid(): string {
    return this._uuid;
  }

  set uuid(value: string) {
    this._uuid = value;
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

  get status(): number {
    return this._status;
  }

  set status(value: number) {
    this._status = value;
  }

  get roles(): string[] {
    return this._roles;
  }

  set roles(value: string[]) {
    this._roles = value;
  }
}
