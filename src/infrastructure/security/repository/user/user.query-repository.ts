import { Inject, Injectable } from '@nestjs/common';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../../domain/model/security/user.model';
import { UserRepository } from './user.repository';
import { UserRepositoryException } from '../../../../domain/repository/user/user.repository.exception';
import { UserEntity } from '../../entity/user.entity';
import { plainToClass } from 'class-transformer';

const USER_ALIAS = 'user';
const USER_TO_SPACE_ALIAS = 'userToSpace';
const SPACE_ALIAS = 'space';

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
      const query = this.repository.createQueryBuilder(USER_ALIAS);

      if (sources && sources.length) {
        sources.map((source: string) => `${USER_ALIAS}.${source}`);
        query.select(sources.join(','));
      }

      const user: UserInterface = await query
        .leftJoinAndSelect(`${USER_ALIAS}.userSpaces`, USER_TO_SPACE_ALIAS)
        .leftJoinAndSelect(`${USER_TO_SPACE_ALIAS}.space`, SPACE_ALIAS)
        .where({ uuid })
        .getOneOrFail()
      ;

      return plainToClass(UserEntity, user, { strategy: 'excludeAll', excludeExtraneousValues: true });
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
      const user: UserInterface = await this.repository.findOneOrFail({ email });
      return plainToClass(UserEntity, user, { strategy: 'excludeAll', excludeExtraneousValues: true });
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
