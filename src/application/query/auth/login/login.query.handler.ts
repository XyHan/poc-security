import { QueryHandlerInterface } from '../../query-handler.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoginQuery } from './login.query';
import { TokenInterface } from '../../../../domain/model/auth/token.model';
import { LoginQueryHandlerException } from './login.query.handler.exception';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';

export class LoginQueryHandler implements QueryHandlerInterface {
  protected readonly _authManager: AuthManagerInterface;
  protected readonly _userRepository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    authManager: AuthManagerInterface,
    userRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._authManager = authManager;
    this._userRepository = userRepository;
    this._logger = logger;
  }

  public async handle(query: LoginQuery): Promise<TokenInterface> {
    const user: UserInterface = await this.findOneUserByEmail(query.email);
    if (!user) throw new LoginQueryHandlerException(`LoginQueryHandler - findOneUserByEmail - User ${query.email} not found`);

    const isValidPassword: boolean = await this._authManager.isValidPassword(query.password, user.password);
    if (!isValidPassword) throw new LoginQueryHandlerException(`LoginQueryHandler - isValidPassword - bad credentials for user ${user.email}`);

    const token: TokenInterface = this._authManager.generateToken(user);
    this._logger.info(`User ${user.email} authorized`);

    return token;
  }

  private async findOneUserByEmail(email: string): Promise<UserInterface | null> {
    try {
      return await this._userRepository.findOneByEmail(email);
    } catch (e) {
      const message: string = `LoginQueryHandler - findOneUserByEmail - Error for user email ${email}: ${e.message}`;
      this._logger.error(message);
      throw new LoginQueryHandlerException(message);
    }
  }
}
