import { Inject, Injectable } from '@nestjs/common';
import { LoggerInterface } from '../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../logger/logger-adapter.service';
import { UserCommandRepositoryInterface } from '../../../domain/repository/user/user.command-repository.interface';
import { UserRepositoryException } from '../../../domain/repository/user/user.repository.exception';
import { UserRepository } from './user.repository';
import { UserInterface } from '../../../domain/model/user/user.model';
import { UserEntity } from '../entity/user.entity';

@Injectable()
export class UserCommandRepository implements UserCommandRepositoryInterface {
  private readonly _logger: LoggerInterface

  constructor(
    private readonly repository: UserRepository,
    @Inject(LoggerAdapterService) logger: LoggerInterface
  ) {
    this._logger = logger;
  }

  public async create(user: UserInterface): Promise<UserInterface> {
    try {
      return await this.repository.save(user);
    } catch (e) {
      const message: string = `UserCommandRepository - Error on create user '${user.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new UserRepositoryException(message);
    }
  }

  public async delete(user: UserEntity): Promise<UserInterface> {
    try {
      return await this.repository.remove(user);
    } catch (e) {
      const message: string = `UserCommandRepository - Error on delete user '${user.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new UserRepositoryException(message);
    }
  }

  public async update(user: UserInterface): Promise<UserInterface> {
    try {
      return await this.repository.save(user);
    } catch (e) {
      const message: string = `UserCommandRepository - Error on update user '${user.uuid}': ${e.message}`;
      this._logger.error(message);
      throw new UserRepositoryException(message);
    }
  }
}
