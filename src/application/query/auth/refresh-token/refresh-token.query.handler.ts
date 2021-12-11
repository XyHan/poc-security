import { QueryHandlerInterface } from '../../query-handler.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { TokenInterface } from '../../../../domain/model/auth/token.model';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { RefreshTokenQuery } from './refresh-token.query';
import { RefreshTokenQueryHandlerException } from './refresh-token.query.handler.exception';

export class RefreshTokenQueryHandler implements QueryHandlerInterface {
  protected readonly _authManager: AuthManagerInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    authManager: AuthManagerInterface,
    logger: LoggerInterface
  ) {
    this._authManager = authManager;
    this._logger = logger;
  }

  public async handle(query: RefreshTokenQuery): Promise<TokenInterface> {
    const user: UserInterface | undefined = await this._authManager.isValidUser(query.token);
    if(!user) throw new RefreshTokenQueryHandlerException(`RefreshTokenQueryHandler - Invalid token`);
    return this.getFreshToken(user);
  }

  private async getFreshToken(user: UserInterface): Promise<TokenInterface> {
    try {
      const token: TokenInterface = this._authManager.generateToken(user);
      this._logger.info(`RefreshTokenQueryHandler - User ${user.email} authorized`);
      return token;
    } catch (e) {
      const message: string = `RefreshTokenQueryHandler - getFreshToken - error: ${e.message}`;
      this._logger.error(message);
      throw new RefreshTokenQueryHandlerException(message);
    }
  }
}
