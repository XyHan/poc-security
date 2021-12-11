import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { SpaceCommandRepositoryInterface } from '../../../../domain/repository/space/space.command-repository.interface';
import { SpaceRepositoryException } from '../../../../domain/repository/space/space.repository.exception';
import { SpaceRepository } from './space.repository';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { SpaceEntity } from '../../entity/space.entity';

@Injectable()
export class SpaceCommandRepository implements SpaceCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: SpaceRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(space: SpaceInterface): Promise<SpaceInterface> {
    try {
      return await this.repository.save(space);
    } catch (e) {
      const message: string = `SpaceCommandRepository - Error on create space '${space.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new SpaceRepositoryException(message);
    }
  }

  public async delete(space: SpaceEntity): Promise<SpaceInterface> {
    try {
      return await this.repository.remove(space);
    } catch (e) {
      const message: string = `SpaceCommandRepository - Error on delete space '${space.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new SpaceRepositoryException(message);
    }
  }

  public async update(space: SpaceInterface): Promise<SpaceInterface> {
    try {
      return await this.repository.save(space);
    } catch (e) {
      const message: string = `SpaceCommandRepository - Error on update space '${space.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new SpaceRepositoryException(message);
    }
  }
}
