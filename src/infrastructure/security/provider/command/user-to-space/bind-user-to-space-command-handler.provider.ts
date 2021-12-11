import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import {
  BindUserToSpaceCommandHandler
} from '../../../../../application/command/user-to-space/bind-user-to-space/bind-user-to-space.command.handler';
import { UserToSpaceCommandRepository } from '../../../repository/user-to-space/user-to-space.command-repository';
import { UserQueryRepository } from '../../../repository/user/user.query-repository';
import { SpaceQueryRepository } from '../../../repository/space/space.query-repository';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import { UserQueryRepositoryInterface } from '../../../../../domain/repository/user/user.query-repository.interface';
import { SpaceQueryRepositoryInterface } from '../../../../../domain/repository/space/space.query-repository.interface';

export const bindUserToSpaceCommandHandlerProvider: FactoryProvider = {
  provide: 'BIND_USER_TO_SPACE_COMMAND_HANDLER',
  useFactory: (
    userToSpaceRepository: UserToSpaceCommandRepositoryInterface,
    userRepository: UserQueryRepositoryInterface,
    spaceRepository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new BindUserToSpaceCommandHandler(userToSpaceRepository, userRepository, spaceRepository, logger);
  },
  inject: [UserToSpaceCommandRepository, UserQueryRepository, SpaceQueryRepository, LoggerAdapterService],
}
