import { SpaceInterface } from '../model/security/space.model';
import { UserInterface } from '../model/security/user.model';
import { UserToSpaceInterface } from '../model/security/user-to-space.model';

export interface UserToSpaceFactoryInterface {
  generate(
    user: UserInterface,
    space: SpaceInterface,
    createdAt: Date,
    createdBy: string,
    permissions: string[]
  ): UserToSpaceInterface;
}

export class UserToSpaceFactory implements UserToSpaceFactoryInterface {
  private readonly _instance: UserToSpaceInterface;

  constructor(instance: UserToSpaceInterface) {
    this._instance = instance;
  }

  public generate(
      user: UserInterface,
      space: SpaceInterface,
      createdAt: Date,
      createdBy: string,
      permissions: string[]
  ): UserToSpaceInterface {
    this._instance.user = user;
    this._instance.space = space;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.permissions = permissions;

    return this._instance;
  }
}
