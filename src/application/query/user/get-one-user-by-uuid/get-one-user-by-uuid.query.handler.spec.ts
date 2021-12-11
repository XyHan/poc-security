import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByUuidQuery } from './get-one-user-by-uuid.query';
import { GetOneUserByUuidQueryHandler } from './get-one-user-by-uuid.query.handler';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { GetOneUserByUuidQueryHandlerException } from './get-one-user-by-uuid.query.handler.exception';

const UUID = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const EMAIL = 'user1@test.com';

describe('get one user by uuid handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let repository: UserQueryRepositoryInterface;

  beforeEach(() => {
    repository = new UserQueryRepositoryMock();
  })

  it ('return a user success', async () => {
    const query = new GetOneUserByUuidQuery(UUID, []);
    const handler = new GetOneUserByUuidQueryHandler(repository, logger);
    const user: UserInterface = await handler.handle(query);
    expect(user.uuid).toEqual(UUID);
    expect(user.email).toEqual(EMAIL);
  });

  it('return a user null success', async () => {
    const query = new GetOneUserByUuidQuery('uuid-not-found', []);
    const handler = new GetOneUserByUuidQueryHandler(repository, logger);
    const user: UserInterface = await handler.handle(query);
    expect(user).toBeNull();
  });

  it('return a user null error', async () => {
    const query = new GetOneUserByUuidQuery('bad-uuid', []);
    const handler = new GetOneUserByUuidQueryHandler(repository, logger);
    await expect(handler.handle(query)).rejects.toThrowError(GetOneUserByUuidQueryHandlerException);
  });
});
