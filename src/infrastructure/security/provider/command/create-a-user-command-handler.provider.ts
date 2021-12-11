import { FactoryProvider } from '@nestjs/common';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../logger/logger-adapter.service';
import { CreateAUserCommandHandler } from '../../../../application/command/user/create/create-a-user.command.handler';
import { UserCommandRepository } from '../../repository/user.command-repository';
import { BcryptAdapter } from '../../adapter/bcrypt.adapter';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';

export const createAUserCommandHandlerProvider: FactoryProvider = {
  provide: 'CREATE_A_USER_COMMAND_HANDLER',
  useFactory: (
    userRepository: UserCommandRepositoryInterface,
    logger: LoggerInterface,
    encrypter: EncrypterInterface
  ) => {
    return new CreateAUserCommandHandler(userRepository, logger, encrypter);
  },
  inject: [UserCommandRepository, LoggerAdapterService, BcryptAdapter],
}
