import { Inject, Injectable } from '@nestjs/common';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import {
  UserToSpaceQueryRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.query-repository.interface';
import { UserToSpaceRepository } from './user-to-space.repository';

@Injectable()
export class UserToSpaceQueryRepository implements UserToSpaceQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: UserToSpaceRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }
}
