import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import {
  UserToSpaceCommandRepositoryMock
} from '../../../../domain/repository/user-to-space/mock/user-to-space.command-repository.mock';
import {
  UserToSpaceQueryRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.query-repository.interface';
import {
  UserToSpaceQueryRepositoryMock
} from '../../../../domain/repository/user-to-space/mock/user-to-space.query-repository.mock';
import { UnbindUserToSpaceCommand } from './unbind-user-to-space.command';
import { UnbindUserToSpaceCommandHandler } from './unbind-user-to-space.command.handler';
import { UnbindUserToSpaceCommandHandlerException } from './unbind-user-to-space.command.handler.exception';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { SpaceQueryRepositoryMock } from '../../../../domain/repository/space/mock/space.query-repository.mock';

const spaceUuid = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const userUuid = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';

describe('unbind an user to a space handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: UserToSpaceCommandRepositoryInterface;
  let queryRepository: UserToSpaceQueryRepositoryInterface;
  let userRepository: UserQueryRepositoryInterface;
  let spaceRepository: SpaceQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new UserToSpaceCommandRepositoryMock();
    queryRepository = new UserToSpaceQueryRepositoryMock();
    userRepository = new UserQueryRepositoryMock();
    spaceRepository = new SpaceQueryRepositoryMock();
  })

  it ('unbind an user to a space success', async () => {
    const command = new UnbindUserToSpaceCommand(spaceUuid, userUuid);
    const handler = new UnbindUserToSpaceCommandHandler(commandRepository, queryRepository, userRepository, spaceRepository, logger);
    await expect(handler.handle(command)).toBeInstanceOf(Object);
  });

  it('unbind an user to a space error', async () => {
    const command = new UnbindUserToSpaceCommand('', '');
    const handler = new UnbindUserToSpaceCommandHandler(commandRepository, queryRepository, userRepository, spaceRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(UnbindUserToSpaceCommandHandlerException);
  });
});
