import { SpaceInterface } from '../model/security/space.model';

export interface SpaceFactoryInterface {
  generate(
    uuid: string,
    status: number,
    objectableType: number,
    objectableUuid: string,
    createdAt: Date,
    createdBy: string,
    updatedAt: Date,
    updatedBy: string
  ): SpaceInterface;
}

export class SpaceFactory implements SpaceFactoryInterface {
  private readonly _instance: SpaceInterface;

  constructor(instance: SpaceInterface) {
    this._instance = instance;
  }

  public generate(
      uuid: string,
      status: number,
      objectableType: number,
      objectableUuid: string,
      createdAt: Date,
      createdBy: string,
      updatedAt: Date,
      updatedBy: string
  ): SpaceInterface {
    this._instance.uuid = uuid;
    this._instance.status = status;
    this._instance.objectableType = objectableType;
    this._instance.objectableUuid = objectableUuid;
    this._instance.createdAt = createdAt;
    this._instance.createdBy = createdBy;
    this._instance.updatedAt = updatedAt;
    this._instance.updatedBy = updatedBy;

    return this._instance;
  }
}
