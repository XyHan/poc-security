import { Inject, Injectable } from '@nestjs/common';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import {
  UserToSpaceQueryRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.query-repository.interface';
import { UserToSpaceRepository } from './user-to-space.repository';
import { UserInterface } from '../../../../domain/model/security/user.model';
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";
import { UserToSpaceInterface } from '../../../../domain/model/security/user-to-space.model';
import { UserToSpaceEntity } from '../../entity/user-to-space.entity';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import {
  UserToSpaceRepositoryException
} from '../../../../domain/repository/user-to-space/user-to-space.repository.exception';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserToSpaceQueryRepository implements UserToSpaceQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: UserToSpaceRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findOneByUserAndSpace(user: UserInterface, space: SpaceInterface, sources: []): Promise<UserToSpaceInterface | null> {
    try {
      let options: FindOneOptions<UserToSpaceEntity> = {};
      if (sources && sources.length) { options.select = sources; }
      const userToSpaceBinding: UserToSpaceInterface = await this.repository.findOneOrFail({ user, space }, options);
      return plainToClass(UserToSpaceEntity, userToSpaceBinding, { strategy: 'excludeAll', excludeExtraneousValues: true });
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`UserToSpaceQueryRepository - findOneByUserUuidAndSpaceUuid - userToSpace not found with User ${user.uuid} and Space ${space.uuid}`);
        return null;
      }
      const message: string = `UserToSpaceQueryRepository - Error on findOneByUserUuidAndSpaceUuid User ${user.uuid} and Space ${space.uuid}`;
      this._logger.error(message);
      throw new UserToSpaceRepositoryException(message);
    }
  }
}
