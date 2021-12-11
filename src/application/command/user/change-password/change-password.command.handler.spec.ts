import { ChangePasswordCommand } from './change-password.command';
import { ChangePasswordCommandHandler } from './change-password.command.handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { EncrypterMock } from '../../../../domain/utils/encrypter/encrypter.mock';
import { UserCommandRepositoryMock } from '../../../../domain/repository/user/mock/user.command-repository.mock';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';
import { ChangePasswordCommandHandlerException } from './change-password.command.handler.exception';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const PASSWORD = 'updatedPassword';

describe('change user password handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  const encrypter: EncrypterInterface = new EncrypterMock();
  let commandRepository: UserCommandRepositoryInterface;
  let queryRepository: UserQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new UserCommandRepositoryMock();
    queryRepository = new UserQueryRepositoryMock();
  })

  it ('change user password success', async () => {
    const user: UserInterface = await queryRepository.findOneByUuid(UUID, []);
    const password: string = user.password;
    const salt: string = user.salt;
    const command = new ChangePasswordCommand(PASSWORD, UUID, UUID);
    const handler = new ChangePasswordCommandHandler(commandRepository, queryRepository, logger, encrypter);
    expect(await handler.handle(command)).toBeUndefined();
    const updatedUser: UserInterface = await queryRepository.findOneByUuid(UUID, []);
    expect(updatedUser.password.length).toBeGreaterThan(password.length);
    expect(updatedUser.salt.length).toBeGreaterThan(salt.length);
  });

  it('change user password error', async () => {
    const command = new ChangePasswordCommand(PASSWORD, UUID, 'wrong-uuid');
    const handler = new ChangePasswordCommandHandler(commandRepository, queryRepository, logger, encrypter);
    await expect(handler.handle(command)).rejects.toThrowError(ChangePasswordCommandHandlerException);
  });
});
