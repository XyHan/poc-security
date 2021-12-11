import { QueryHandlerInterface } from '../../query-handler.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { GetOneUserByUuidQuery } from './get-one-user-by-uuid.query';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByUuidQueryHandlerException } from './get-one-user-by-uuid.query.handler.exception';

export class GetOneUserByUuidQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: UserQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneUserByUuidQuery): Promise<UserInterface | null> {
    try {
      return await this._repository.findOneByUuid(query.uuid, query.sources);
    } catch (e) {
      const message: string = `GetOneUserByUuidQueryHandler - User ${query.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneUserByUuidQueryHandlerException(message);
    }
  }
}
