import { UserInterface } from './user.model';
import { SpaceInterface } from './space.model';

export interface UserToSpaceInterface {
  user: UserInterface;
  space: SpaceInterface;
  createdAt: Date;
  createdBy: string;
  permissions: string[];
}

export class UserToSpaceModel implements UserToSpaceInterface {
  protected _user: UserInterface;
  protected _space: SpaceInterface;
  protected _createdAt: Date;
  protected _createdBy: string;
  private _permissions: string[];

  get user(): UserInterface {
    return this._user;
  }

  set user(value: UserInterface) {
    this._user = value;
  }

  get space(): SpaceInterface {
    return this._space;
  }

  set space(value: SpaceInterface) {
    this._space = value;
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

  get permissions(): string[] {
    return this._permissions;
  }

  set permissions(value: string[]) {
    this._permissions = value;
  }
}
