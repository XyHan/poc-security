import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { SpaceCommandRepository } from '../../../repository/space/space.command-repository';
import { SpaceCommandRepositoryInterface } from '../../../../../domain/repository/space/space.command-repository.interface';
import { SpaceQueryRepository } from '../../../repository/space/space.query-repository';
import { SpaceQueryRepositoryInterface } from '../../../../../domain/repository/space/space.query-repository.interface';
import { DeleteASpaceCommandHandler } from '../../../../../application/command/space/delete/delete-a-space.command.handler';

export const deleteASpaceCommandHandlerProvider: FactoryProvider = {
  provide: 'DELETE_A_USER_COMMAND_HANDLER',
  useFactory: (
    spaceCommandRepository: SpaceCommandRepositoryInterface,
    spaceQueryRepository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface,
  ) => {
    return new DeleteASpaceCommandHandler(spaceCommandRepository, spaceQueryRepository, logger);
  },
  inject: [SpaceCommandRepository, SpaceQueryRepository, LoggerAdapterService],
}
