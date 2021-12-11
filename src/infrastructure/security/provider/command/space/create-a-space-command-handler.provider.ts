import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { CreateASpaceCommandHandler } from '../../../../../application/command/space/create/create-a-space.command.handler';
import { SpaceCommandRepository } from '../../../repository/space/space.command-repository';
import { SpaceCommandRepositoryInterface } from '../../../../../domain/repository/space/space.command-repository.interface';

export const createASpaceCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_SPACE_COMMAND_HANDLER',
  useFactory: (
    spaceRepository: SpaceCommandRepositoryInterface,
    logger: LoggerInterface
  ) => {
    return new CreateASpaceCommandHandler(spaceRepository, logger);
  },
  inject: [SpaceCommandRepository, LoggerAdapterService],
}
