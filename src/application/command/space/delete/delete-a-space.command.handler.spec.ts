import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { SpaceCommandRepositoryInterface } from '../../../../domain/repository/space/space.command-repository.interface';
import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { DeleteASpaceCommand } from './delete-a-space.command';
import { DeleteASpaceCommandHandler } from './delete-a-space.command.handler';
import { LoggerMock } from "../../../../domain/utils/logger/logger.mock";
import { SpaceCommandRepositoryMock } from '../../../../domain/repository/space/mock/space.command-repository.mock';
import { SpaceQueryRepositoryMock } from '../../../../domain/repository/space/mock/space.query-repository.mock';
import { DeleteASpaceCommandHandlerException } from './delete-a-space.command.handler.exception';

const UUID = '0d66db91-4441-4563-967c-797d767c7288';
const UPDATEDBY = 'fa9f9d7d-3303-4b08-ad27-61bd605c9d19';

describe('delete a security handler test', () => {
  const logger: LoggerInterface = new LoggerMock();
  let commandRepository: SpaceCommandRepositoryInterface;
  let queryRepository: SpaceQueryRepositoryInterface;

  beforeEach(() => {
    commandRepository = new SpaceCommandRepositoryMock();
    queryRepository = new SpaceQueryRepositoryMock();
  })

  it ('delete a security success', async () => {
    const space: SpaceInterface | null = await queryRepository.findOneByUuid(UUID, []);
    expect(space.uuid).toBe(UUID);

    const command = new DeleteASpaceCommand(UUID, UPDATEDBY);
    const handler = new DeleteASpaceCommandHandler(commandRepository, queryRepository, logger);
    await handler.handle(command);
    const deletedSpace: SpaceInterface | null = await queryRepository.findOneByUuid(UUID, []);
    expect(deletedSpace.status).toBe(0);
    expect(deletedSpace.updatedBy).toBe(UPDATEDBY);
  });

  it('delete a security error', async () => {
    const command = new DeleteASpaceCommand('', '');
    const handler = new DeleteASpaceCommandHandler(commandRepository, queryRepository, logger);
    await expect(handler.handle(command)).rejects.toThrowError(DeleteASpaceCommandHandlerException);
  });
});
