import { UserInterface } from '../model/security/user.model';

export interface UserFactoryInterface {
  generate(
    uuid: string,
    status: number,
    email: string,
    password: string,
    salt: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string
  ): UserInterface;
}

export class UserFactory implements UserFactoryInterface {
  private readonly _instance: UserInterface;

  constructor(instance: UserInterface) {
    this._instance = instance;
  }

  public generate(
    uuid: string,
    status: number,
    email: string,
    password: string,
    salt: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string
  ): UserInterface {
    this._instance.uuid = uuid;
    this._instance.status = status;
    this._instance.email = email;
    this._instance.password = password;
    this._instance.salt = salt;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.updatedAt = updatedAt;
    this._instance.updatedBy = updatedBy;

    return this._instance;
  }
}
