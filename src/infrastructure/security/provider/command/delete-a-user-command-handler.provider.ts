import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { UserCommandRepository } from '../../repository/user.command-repository';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserQueryRepository } from '../../repository/user.query-repository';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { DeleteAUserCommandHandler } from '../../../../application/command/user/delete/delete-a-user.command.handler';

export const deleteAUserCommandHandlerProvider: FactoryProvider = {
  provide: 'DELETE_A_USER_COMMAND_HANDLER',
  useFactory: (
    userCommandRepository: UserCommandRepositoryInterface,
    userQueryRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface,
  ) => {
    return new DeleteAUserCommandHandler(userCommandRepository, userQueryRepository, logger);
  },
  inject: [UserCommandRepository, UserQueryRepository, LoggerAdapterService],
}
