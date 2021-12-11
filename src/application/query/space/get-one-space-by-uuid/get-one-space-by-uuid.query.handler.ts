import { QueryHandlerInterface } from '../../query-handler.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { GetOneSpaceByUuidQuery } from './get-one-space-by-uuid.query';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { GetOneSpaceByUuidQueryHandlerException } from './get-one-space-by-uuid.query.handler.exception';

export class GetOneSpaceByUuidQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: SpaceQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneSpaceByUuidQuery): Promise<SpaceInterface | null> {
    try {
      return await this._repository.findOneByUuid(query.uuid, query.sources);
    } catch (e) {
      const message: string = `GetOneSpaceByUuidQueryHandler - Space ${query.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneSpaceByUuidQueryHandlerException(message);
    }
  }
}
