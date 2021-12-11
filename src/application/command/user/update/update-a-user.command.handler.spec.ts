import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UpdateAUserCommand } from './update-a-user.command';
import { UpdateAUserCommandHandler } from './update-a-user.command.handler';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { UserCommandRepositoryMock } from '../../../../domain/repository/user/mock/user.command-repository.mock';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { UpdateAUserCommandHandlerException } from './update-a-user.command.handler.exception';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const EMAIL = 'stillnotme@unknow.com';
const STATUS = 2;
const UPDATEDBY = '31dd20e0-zzzz-yyyy-xxxx-d9cc3aff4028';
const ROLES = ['ADMIN'];

describe('update a user handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: UserCommandRepositoryInterface;
  let queryRepository: UserQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new UserCommandRepositoryMock();
    queryRepository = new UserQueryRepositoryMock();
  })

  it ('update a user success', async () => {
    const command = new UpdateAUserCommand(UUID, STATUS, EMAIL, UPDATEDBY, ROLES);
    const handler = new UpdateAUserCommandHandler(commandRepository, queryRepository, logger);
    await handler.handle(command);
    const updatedUser: UserInterface = await queryRepository.findOneByUuid(UUID, []);
    expect(updatedUser.email).toBe(EMAIL);
    expect(updatedUser.status).toBe(STATUS);
    expect(updatedUser.updatedBy).toBe(UPDATEDBY);
  });

  it('update a user error', async () => {
    const command = new UpdateAUserCommand('', 1, '', '', ROLES);
    const handler = new UpdateAUserCommandHandler(commandRepository, queryRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(UpdateAUserCommandHandlerException);
  });
});
