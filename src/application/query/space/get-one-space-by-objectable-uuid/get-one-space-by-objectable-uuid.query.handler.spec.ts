import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { GetOneSpaceByObjectableUuidQuery } from './get-one-space-by-objectable-uuid.query';
import { GetOneSpaceByObjectableUuidQueryHandler } from './get-one-space-by-objectable-uuid.query.handler';
import { SpaceQueryRepositoryMock } from '../../../../domain/repository/space/mock/space.query-repository.mock';
import { GetOneSpaceByObjectableUuidQueryHandlerException } from './get-one-space-by-objectable-uuid.query.handler.exception';

const UUID = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';

describe('get one space by objectable uuid handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let repository: SpaceQueryRepositoryInterface;

  beforeEach(() => {
    repository = new SpaceQueryRepositoryMock();
  })

  it ('return a space success', async () => {
    const query = new GetOneSpaceByObjectableUuidQuery(UUID, []);
    const handler = new GetOneSpaceByObjectableUuidQueryHandler(repository, logger);
    const space: SpaceInterface = await handler.handle(query);
    expect(space.uuid).toEqual(UUID);
  });

  it('return a space null success', async () => {
    const query = new GetOneSpaceByObjectableUuidQuery('uuid-not-found', []);
    const handler = new GetOneSpaceByObjectableUuidQueryHandler(repository, logger);
    const space: SpaceInterface = await handler.handle(query);
    expect(space).toBeNull();
  });

  it('return a space null error', async () => {
    const query = new GetOneSpaceByObjectableUuidQuery('bad-objectable-uuid', []);
    const handler = new GetOneSpaceByObjectableUuidQueryHandler(repository, logger);
    await expect(handler.handle(query)).rejects.toThrowError(GetOneSpaceByObjectableUuidQueryHandlerException);
  });
});
