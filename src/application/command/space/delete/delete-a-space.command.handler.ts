import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { SpaceCommandRepositoryInterface } from '../../../../domain/repository/space/space.command-repository.interface';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';
import { DeleteASpaceCommandHandlerException } from './delete-a-space.command.handler.exception';
import { DeleteASpaceCommand } from './delete-a-space.command';

export class DeleteASpaceCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: SpaceCommandRepositoryInterface;
  protected readonly _queryRepository: SpaceQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: SpaceCommandRepositoryInterface,
    queryRepository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
  }

  async handle(command: DeleteASpaceCommand): Promise<void> {
    const space: SpaceInterface = await this.findOneSpaceByUuid(command.uuid);
    if (!space) throw new DeleteASpaceCommandHandlerException(`DeleteASpaceCommandHandler - Space ${command.uuid} not found`);
    await this.updateSpace(space, command);
    this._logger.info(`DeleteASpaceCommandHandler - Space ${space.uuid} deleted`);
  }

  private async findOneSpaceByUuid(uuid: string): Promise<SpaceInterface> {
    try {
      return await this._queryRepository.findOneByUuid(uuid, []);
    } catch (e) {
      const message: string = `DeleteASpaceCommandHandler - findOneSpaceByUuid - Space ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteASpaceCommandHandlerException(message);
    }
  }

  private async updateSpace(space: SpaceInterface, command: DeleteASpaceCommand): Promise<void> {
    try {
      space.status = 0;
      space.updatedBy = command.updatedBy;
      space.updatedAt = new Date();
      await this._commandRepository.update(space);
    } catch (e) {
      const message: string = `DeleteASpaceCommandHandler - updateSpace - Space ${space.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteASpaceCommandHandlerException(message);
    }
  }
}
