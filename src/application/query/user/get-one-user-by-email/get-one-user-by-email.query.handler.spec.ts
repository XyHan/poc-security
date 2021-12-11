import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByEmailQuery } from './get-one-user-by-email.query';
import { GetOneUserByEmailQueryHandler } from './get-one-user-by-email.query.handler';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { GetOneUserByEmailQueryHandlerException } from './get-one-user-by-email.query.handler.exception';

const UUID = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const EMAIL = 'user1@test.com';

describe('get one user by email handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let repository: UserQueryRepositoryInterface;

  beforeEach(() => {
    repository = new UserQueryRepositoryMock();
  })

  it ('return a user success', async () => {
    const query = new GetOneUserByEmailQuery(EMAIL);
    const handler = new GetOneUserByEmailQueryHandler(repository, logger);
    const user: UserInterface = await handler.handle(query);
    expect(user.uuid).toEqual(UUID);
  });

  it('return a user null success', async () => {
    const query = new GetOneUserByEmailQuery('email-not-found');
    const handler = new GetOneUserByEmailQueryHandler(repository, logger);
    const user: UserInterface = await handler.handle(query);
    expect(user).toBeNull();
  });

  it('return a user null error', async () => {
    const query = new GetOneUserByEmailQuery('bad-email');
    const handler = new GetOneUserByEmailQueryHandler(repository, logger);
    await expect(handler.handle(query)).rejects.toThrowError(GetOneUserByEmailQueryHandlerException);
  });
});
