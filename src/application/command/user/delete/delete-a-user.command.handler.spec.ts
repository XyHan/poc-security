import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { DeleteAUserCommand } from './delete-a-user.command';
import { DeleteAUserCommandHandler } from './delete-a-user.command.handler';
import { LoggerMock } from "../../../../domain/utils/logger/logger.mock";
import { UserCommandRepositoryMock } from '../../../../domain/repository/user/mock/user.command-repository.mock';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { DeleteAUserCommandHandlerException } from './delete-a-user.command.handler.exception';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const UPDATEDBY = 'fa9f9d7d-3303-4b08-ad27-61bd605c9d19';

describe('delete a user handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: UserCommandRepositoryInterface;
  let queryRepository: UserQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new UserCommandRepositoryMock();
    queryRepository = new UserQueryRepositoryMock();
  })

  it ('delete a user success', async () => {
    const user: UserInterface | null = await queryRepository.findOneByUuid(UUID, []);
    expect(user.uuid).toBe(UUID);

    const command = new DeleteAUserCommand(UUID, UPDATEDBY);
    const handler = new DeleteAUserCommandHandler(commandRepository, queryRepository, logger);
    await handler.handle(command);
    const deletedUser: UserInterface | null = await queryRepository.findOneByUuid(UUID, []);
    expect(deletedUser.status).toBe(0);
    expect(deletedUser.updatedBy).toBe(UPDATEDBY);
  });

  it('delete a user error', async () => {
    const command = new DeleteAUserCommand('', '');
    const handler = new DeleteAUserCommandHandler(commandRepository, queryRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(DeleteAUserCommandHandlerException);
  });
});
