import { FactoryProvider } from '@nestjs/common';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { AuthService } from '../../service/auth/auth.service';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { RefreshTokenQueryHandler } from '../../../../application/query/auth/refresh-token/refresh-token.query.handler';

export const refreshTokenQueryHandlerProvider: FactoryProvider = {
  provide: 'REFRESH_TOKEN_QUERY_HANDLER',
  useFactory: (authService: AuthManagerInterface, logger: LoggerInterface) => {
    return new RefreshTokenQueryHandler(authService, logger);
  },
  inject: [AuthService, LoggerAdapterService],
}
