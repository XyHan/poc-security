import { QueryHandlerInterface } from '../../query-handler.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { GetOneSpaceByObjectableUuidQuery } from './get-one-space-by-objectable-uuid.query';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { GetOneSpaceByObjectableUuidQueryHandlerException } from './get-one-space-by-objectable-uuid.query.handler.exception';

export class GetOneSpaceByObjectableUuidQueryHandler implements QueryHandlerInterface {
  protected readonly _repository: SpaceQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  async handle(query: GetOneSpaceByObjectableUuidQuery): Promise<SpaceInterface | null> {
    try {
      return await this._repository.findOneByObjectableUuid(query.objectableUuid, query.sources);
    } catch (e) {
      const message: string = `GetOneSpaceByObjectableUuidQueryHandler - Space ${query.objectableUuid} error: ${e.message}`;
      this._logger.error(message);
      throw new GetOneSpaceByObjectableUuidQueryHandlerException(message);
    }
  }
}
