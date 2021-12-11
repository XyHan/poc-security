import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { TokenInterface, TokenModel } from '../../../../domain/model/auth/token.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { AuthManagerMock } from '../../../../domain/utils/security/auth-manager.mock';
import { RefreshTokenQuery } from './refresh-token.query';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { RefreshTokenQueryHandler } from './refresh-token.query.handler';

const EMAIL = 'user1@test.com';
const PASSWORD = 'password1';

describe('refresh token handler test', () => {
  let logger: LoggerInterface;
  let userRepository: UserQueryRepositoryInterface;
  let authManager: AuthManagerInterface;

  beforeEach(async () => {
    logger = new LoggerMock();
    userRepository = new UserQueryRepositoryMock();
    authManager = new AuthManagerMock(EMAIL, PASSWORD);
  })

  it ('return a fresh token success', async () => {
    const user: UserInterface = await userRepository.findOneByEmail(EMAIL);
    const token: TokenInterface = authManager.generateToken(user);
    const query = new RefreshTokenQuery(token);
    const handler = new RefreshTokenQueryHandler(authManager, logger);
    const newToken: TokenInterface = await handler.handle(query);
    expect(newToken).toBeInstanceOf(TokenModel);
    expect(newToken.toString()).toContain('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.');
    expect(newToken.toString() !== token.toString()).toBeTruthy();
  });

  it ('return a fresh token error', async () => {
    const token: TokenInterface = new TokenModel('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    const query = new RefreshTokenQuery(token);
    const handler = new RefreshTokenQueryHandler(authManager, logger);
    await expect(handler.handle(query)).rejects.toThrowError('RefreshTokenQueryHandler - Invalid token');
  });
});
