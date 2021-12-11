import { LoginQuery } from './login.query';
import { LoginQueryHandler } from './login.query.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { TokenInterface } from '../../../../domain/model/auth/token.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { AuthManagerMock } from '../../../../domain/utils/security/auth-manager.mock';
import { LoginQueryHandlerException } from './login.query.handler.exception';

const EMAIL = 'user2@test.com';
const PASSWORD = 'password2';

describe('login handler test', () => {
  let logger: LoggerInterface;
  let userRepository: UserQueryRepositoryInterface;
  let authManager: AuthManagerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
    userRepository = new UserQueryRepositoryMock();
    authManager = new AuthManagerMock(EMAIL, PASSWORD);
  })

  it ('return a token success', async () => {
    const query = new LoginQuery(EMAIL, PASSWORD);
    const handler = new LoginQueryHandler(authManager, userRepository, logger);
    const token: TokenInterface = await handler.handle(query);
    expect(token.token).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.');
  });

  it('return an bad email error', async () => {
    const query = new LoginQuery('bad-email', '');
    const handler = new LoginQueryHandler(authManager, userRepository, logger);
    await expect(handler.handle(query)).rejects.toThrowError(LoginQueryHandlerException);
  });

  it('return an bad password error', async () => {
    const query = new LoginQuery(EMAIL, '');
    const handler = new LoginQueryHandler(authManager, userRepository, logger);
    await expect(handler.handle(query)).rejects.toThrowError(LoginQueryHandlerException);
  });
});
