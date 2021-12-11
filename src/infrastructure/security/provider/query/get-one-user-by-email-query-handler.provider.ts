import { FactoryProvider } from '@nestjs/common';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepository } from '../../repository/user.query-repository';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { GetOneUserByEmailQueryHandler } from '../../../../application/query/user/get-one-user-by-email/get-one-user-by-email.query.handler';

export const getOneUserByEmailQueryHandlerProvider: FactoryProvider = {
  provide: 'GET_ONE_USER_BY_EMAIL_QUERY_HANDLER',
  useFactory: (userRepository: UserQueryRepositoryInterface, logger: LoggerInterface) => {
    return new GetOneUserByEmailQueryHandler(userRepository, logger);
  },
  inject: [UserQueryRepository, LoggerAdapterService],
}
