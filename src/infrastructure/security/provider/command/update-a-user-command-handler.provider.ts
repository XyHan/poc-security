import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { UserCommandRepository } from '../../repository/user.command-repository';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UpdateAUserCommandHandler } from '../../../../application/command/user/update/update-a-user.command.handler';
import { UserQueryRepository } from '../../repository/user.query-repository';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';

export const updateAUserCommandHandlerProvider: FactoryProvider = {
  provide: 'UPDATE_A_USER_COMMAND_HANDLER',
  useFactory: (
    userCommandRepository: UserCommandRepositoryInterface,
    userQueryRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface,
  ) => {
    return new UpdateAUserCommandHandler(userCommandRepository, userQueryRepository, logger);
  },
  inject: [UserCommandRepository, UserQueryRepository, LoggerAdapterService],
}
