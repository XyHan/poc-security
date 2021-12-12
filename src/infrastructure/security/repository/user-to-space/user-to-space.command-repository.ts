import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import { UserToSpaceRepository } from './user-to-space.repository';
import { UserToSpaceInterface } from '../../../../domain/model/security/user-to-space.model';
import { UserToSpaceEntity } from '../../entity/user-to-space.entity';
import {
  UserToSpaceRepositoryException
} from '../../../../domain/repository/user-to-space/user-to-space.repository.exception';

@Injectable()
export class UserToSpaceCommandRepository implements UserToSpaceCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: UserToSpaceRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(userToSpace: UserToSpaceInterface): Promise<UserToSpaceInterface> {
    try {
      return await this.repository.save(userToSpace);
    } catch (e) {
      const message: string = `UserToSpaceCommandRepository - Error on create userToSpace '${userToSpace.user.uuid}' | '${userToSpace.space.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new UserToSpaceRepositoryException(message);
    }
  }

  public async delete(userToSpace: UserToSpaceEntity): Promise<void> {
    try {
      await this.repository.remove(userToSpace);
    } catch (e) {
      const message: string = `UserToSpaceCommandRepository - Error on delete userToSpace '${userToSpace.user.uuid}' | '${userToSpace.space.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new UserToSpaceRepositoryException(message);
    }
  }
}
