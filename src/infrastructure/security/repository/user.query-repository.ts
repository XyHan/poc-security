import { Inject, Injectable } from '@nestjs/common';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { UserQueryRepositoryInterface } from '../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../domain/model/user/user.model';
import { UserRepository } from './user.repository';
import { UserRepositoryException } from '../../../domain/repository/user/user.repository.exception';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserQueryRepository implements UserQueryRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: UserRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async findOneByUuid(uuid: string, sources: any[]): Promise<UserInterface | null> {
    try {
      let options: FindOneOptions<UserEntity> = {};
      if (sources && sources.length) { options.select = sources; }
      return await this.repository.findOneOrFail({ uuid }, options);
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`UserQueryRepository - findOneByUuid - User ${uuid} not found`);
        return null;
      }
      const message: string = `UserQueryRepository - Error on findOneByUuid user '${uuid}'`;
      this._logger.error(message);
      throw new UserRepositoryException(message);
    }
  }


  public async findOneByEmail(email: string): Promise<UserInterface | null> {
    try {
      return await this.repository.findOneOrFail({ email });
    } catch (e) {
      if (e.name === 'EntityNotFound') {
        this._logger.warn(`UserQueryRepository - findOneByEmail - User ${email} not found`);
        return null;
      }
      const message: string = `UserQueryRepository - Error on findOneByEmail user '${email}'`;
      this._logger.error(message);
      throw new UserRepositoryException(message);
    }
  }
}
