import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { CreateAUserCommand } from './create-a-user.command';
import { CreateAUserCommandHandler } from './create-a-user.command.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserCommandRepositoryMock } from '../../../../domain/repository/user/mock/user.command-repository.mock';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';
import { EncrypterMock } from '../../../../domain/utils/encrypter/encrypter.mock';
import { CreateAUserCommandHandlerException } from './create-a-user.command.handler.exception';

const UUID = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const EMAIL = 'notme@unknow.com';
const PASSWORD = 'changeme';
const ROLES = ['USER'];

describe('create a user handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  const encrypter: EncrypterInterface = new EncrypterMock();
  let commandRepository: UserCommandRepositoryInterface;
  let queryRepository: UserQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new UserCommandRepositoryMock();
    queryRepository = new UserQueryRepositoryMock();
  })

  it ('create a user success', async () => {
    const command = new CreateAUserCommand(UUID, EMAIL, PASSWORD, UUID, ROLES);
    const handler = new CreateAUserCommandHandler(commandRepository, logger, encrypter);
    await handler.handle(command);
    const createdUser: UserInterface = await queryRepository.findOneByUuid(UUID, []);
    expect(createdUser.uuid).toBe(UUID);
    expect(createdUser.status).toBe(1);
    expect(createdUser.email).toBe(EMAIL);
    expect(createdUser.password.length).toBeGreaterThan(PASSWORD.length);
    expect(createdUser.salt).toBeDefined();
    expect(createdUser.createdAt).toBeDefined();
    expect(createdUser.createdBy).toBeDefined();
    expect(createdUser.updatedAt).toBeDefined();
    expect(createdUser.updatedBy).toBe(UUID);
    expect(createdUser.roles[0]).toBe(ROLES[0]);
  });

  it('create a user error', async () => {
    const command = new CreateAUserCommand('', '', '', '', []);
    const handler = new CreateAUserCommandHandler(commandRepository, logger, encrypter);
    await expect(handler.handle(command)).rejects.toThrowError(CreateAUserCommandHandlerException);
  });
});
