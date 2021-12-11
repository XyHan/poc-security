import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { UserQueryRepositoryMock } from '../../../../domain/repository/user/mock/user.query-repository.mock';
import { BindUserToSpaceCommand } from './bind-user-to-space.command';
import { BindUserToSpaceCommandHandler } from './bind-user-to-space.command.handler';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import {
  UserToSpaceCommandRepositoryMock
} from '../../../../domain/repository/user-to-space/mock/user-to-space.command-repository.mock';
import { SpaceQueryRepositoryMock } from '../../../../domain/repository/space/mock/space.query-repository.mock';
import { BindUserToSpaceCommandHandlerException } from './bind-user-to-space.command.handler.exception';

const createdBy = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const spaceUuid = '5e4e03a6-6e6f-4b39-a158-307d1e9082d8';
const userUuid = 'b51b7315-d7ba-49b1-ad7d-ea4c8167b3d0';

describe('bind an user to a space handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: UserToSpaceCommandRepositoryInterface;
  let userRepository: UserQueryRepositoryInterface;
  let spaceRepository: SpaceQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new UserToSpaceCommandRepositoryMock();
    userRepository = new UserQueryRepositoryMock();
    spaceRepository = new SpaceQueryRepositoryMock();
  })

  it ('bind an user to a space success', async () => {
    const command = new BindUserToSpaceCommand(spaceUuid, userUuid, createdBy, []);
    const handler = new BindUserToSpaceCommandHandler(commandRepository, userRepository, spaceRepository, logger);
    const userToSpaceBinding = await handler.handle(command);
    expect(userToSpaceBinding.user.uuid).toEqual(userUuid);
    expect(userToSpaceBinding.user.email).toEqual('user3@test.com');
    expect(userToSpaceBinding.space.uuid).toEqual(spaceUuid);
    expect(userToSpaceBinding.space.objectableUuid).toEqual('e5155e2a-7035-4160-9338-0b7e3d6bc3ec');
  });

  it('bind an user to a space error', async () => {
    const command = new BindUserToSpaceCommand('', '', '', []);
    const handler = new BindUserToSpaceCommandHandler(commandRepository, userRepository, spaceRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(BindUserToSpaceCommandHandlerException);
  });
});
