import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { SpaceCommandRepositoryInterface } from '../../../../domain/repository/space/space.command-repository.interface';
import { CreateASpaceCommand } from './create-a-space.command';
import { CreateASpaceCommandHandler } from './create-a-space.command.handler';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { LoggerMock } from '../../../../domain/utils/logger/logger.mock';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { SpaceCommandRepositoryMock } from '../../../../domain/repository/space/mock/space.command-repository.mock';
import { SpaceQueryRepositoryMock } from '../../../../domain/repository/space/mock/space.query-repository.mock';
import { CreateASpaceCommandHandlerException } from './create-a-space.command.handler.exception';

const uuid = '31dd20e0-9a1d-4734-b0af-d9cc3aff4028';
const objectableType = 1;
const objectableUuid = '4e53748b-7847-437f-8c1a-646c54912e9a';
const userUuid = '89f248dc-7728-4962-a13c-42edb740f5a8';

describe('create a security handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: SpaceCommandRepositoryInterface;
  let queryRepository: SpaceQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new SpaceCommandRepositoryMock();
    queryRepository = new SpaceQueryRepositoryMock();
  })

  it ('create a security success', async () => {
    const command = new CreateASpaceCommand(uuid, userUuid, objectableUuid, objectableType);
    const handler = new CreateASpaceCommandHandler(commandRepository, logger);
    await handler.handle(command);
    const createdSpace: SpaceInterface = await queryRepository.findOneByUuid(uuid, []);
    expect(createdSpace.uuid).toBe(uuid);
    expect(createdSpace.status).toBe(1);
    expect(createdSpace.objectableType).toBeDefined();
    expect(createdSpace.objectableUuid).toBeDefined();
    expect(createdSpace.createdAt).toBeDefined();
    expect(createdSpace.createdBy).toBeDefined();
    expect(createdSpace.updatedAt).toBeDefined();
    expect(createdSpace.updatedBy).toBe(userUuid);
  });

  it('create a security error', async () => {
    const command = new CreateASpaceCommand('', '', '', 1);
    const handler = new CreateASpaceCommandHandler(commandRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(CreateASpaceCommandHandlerException);
  });
});
