import { QueryHandlerInterface } from '../../query-handler.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByEmailQuery } from './get-one-user-by-email.query';
import { GetOneUserByEmailQueryHandlerException } from './get-one-user-by-email.query.handler.exception';

export class GetOneUserByEmailQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: UserQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneUserByEmailQuery): Promise<UserInterface | null> {
    try {
      return await this._repository.findOneByEmail(query.email);
    } catch (e) {
      const message: string = `GetOneUserByEmailQueryHandler - User ${query.email} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneUserByEmailQueryHandlerException(message);
    }
  }
}
