import { Inject, Injectable } from '@nestjs/common';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { SpaceRepository } from './space.repository';
import { SpaceRepositoryException } from '../../../../domain/repository/space/space.repository.exception';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { SpaceEntity } from '../../entity/space.entity';

@Injectable()
export class SpaceQueryRepository implements SpaceQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: SpaceRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findOneByUuid(uuid: string, sources: any[]): Promise<SpaceInterface | null> {
    try {
      let options: FindOneOptions<SpaceEntity> = {};
      if (sources && sources.length) { options.select = sources; }
      return await this.repository.findOneOrFail({ uuid }, options);
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`SpaceQueryRepository - findOneByUuid - Space ${uuid} not found`);
        return null;
      }
      const message: string = `SpaceQueryRepository - Error on findOneByUuid space '${uuid}'`;
      this._logger.error(message);
      throw new SpaceRepositoryException(message);
    }
  }


  public async findOneByObjectableUuid(objectableUuid: string): Promise<SpaceInterface | null> {
    try {
      return await this.repository.findOneOrFail({ objectableUuid });
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`SpaceQueryRepository - findOneByObjectableUuid - Space ${objectableUuid} not found`);
        return null;
      }
      const message: string = `SpaceQueryRepository - Error on findOneByObjectableUuid space '${objectableUuid}'`;
      this._logger.error(message);
      throw new SpaceRepositoryException(message);
    }
  }
}
