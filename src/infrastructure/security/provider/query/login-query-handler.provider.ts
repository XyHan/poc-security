import { FactoryProvider } from '@nestjs/common';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoginQueryHandler } from '../../../../application/query/auth/login/login.query.handler';
import { AuthService } from '../../service/auth/auth.service';
import { UserQueryRepository } from '../../repository/user.query-repository';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';

export const loginQueryHandlerProvider: FactoryProvider = {
  provide: 'LOGIN_QUERY_HANDLER',
  useFactory: (
    authService: AuthManagerInterface,
    userRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new LoginQueryHandler(authService, userRepository, logger);
  },
  inject: [AuthService, UserQueryRepository, LoggerAdapterService],
}
