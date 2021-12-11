import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { UserToSpaceCommandRepository } from '../../../repository/user-to-space/user-to-space.command-repository';
import { UserQueryRepository } from '../../../repository/user/user.query-repository';
import { SpaceQueryRepository } from '../../../repository/space/space.query-repository';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import { UserQueryRepositoryInterface } from '../../../../../domain/repository/user/user.query-repository.interface';
import { SpaceQueryRepositoryInterface } from '../../../../../domain/repository/space/space.query-repository.interface';
import { UserToSpaceQueryRepository } from '../../../repository/user-to-space/user-to-space.query-repository';
import {
  UserToSpaceQueryRepositoryInterface
} from '../../../../../domain/repository/user-to-space/user-to-space.query-repository.interface';
import {
  UnbindUserToSpaceCommandHandler
} from '../../../../../application/command/user-to-space/unbind-user-to-space/unbind-user-to-space.command.handler';

export const unbindUserToSpaceCommandHandlerProvider: FactoryProvider = {
  provide: 'UNBIND_USER_TO_SPACE_COMMAND_HANDLER',
  useFactory: (
    userToSpaceCommandRepository: UserToSpaceCommandRepositoryInterface,
    userToSpaceQueryRepository: UserToSpaceQueryRepositoryInterface,
    userRepository: UserQueryRepositoryInterface,
    spaceRepository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new UnbindUserToSpaceCommandHandler(
        userToSpaceCommandRepository,
        userToSpaceQueryRepository,
        userRepository,
        spaceRepository,
        logger
    );
  },
  inject: [
    UserToSpaceCommandRepository,
    UserToSpaceQueryRepository,
    UserQueryRepository,
    SpaceQueryRepository,
    LoggerAdapterService
  ],
}
