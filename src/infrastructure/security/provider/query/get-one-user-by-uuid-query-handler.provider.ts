import { FactoryProvider } from '@nestjs/common';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepository } from '../../repository/user.query-repository';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { GetOneUserByUuidQueryHandler } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query.handler';

export const getOneUserByUuidQueryHandlerProvider: FactoryProvider = {
  provide: 'GET_ONE_USER_BY_UUID_QUERY_HANDLER',
  useFactory: (userRepository: UserQueryRepositoryInterface, logger: LoggerInterface) => {
    return new GetOneUserByUuidQueryHandler(userRepository, logger);
  },
  inject: [UserQueryRepository, LoggerAdapterService],
}
