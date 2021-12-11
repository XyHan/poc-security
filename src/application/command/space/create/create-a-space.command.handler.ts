import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { SpaceCommandRepositoryInterface } from '../../../../domain/repository/space/space.command-repository.interface';
import { CreateASpaceCommand } from './create-a-space.command';
import { SpaceInterface, SpaceModel } from '../../../../domain/model/security/space.model';
import { SpaceFactory } from '../../../../domain/factory/space.factory';
import { CreateASpaceCommandHandlerException } from './create-a-space.command.handler.exception';

export class CreateASpaceCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: SpaceCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: SpaceCommandRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._logger = logger;
  }

  public async handle(command: CreateASpaceCommand): Promise<void> {
    const space: SpaceInterface = await this.generateSpaceFromCommand(command);
    await this.registerSpace(space);
  }

  private async generateSpaceFromCommand(command: CreateASpaceCommand): Promise<SpaceInterface> {
    try {
      return new SpaceFactory(new SpaceModel()).generate(
        command.uuid,
        1,
        command.objectableType,
        command.objectableUuid,
        new Date(),
        command.userUuid,
        new Date(),
        command.userUuid
      );
    } catch (e) {
      const message: string = `CreateASpaceCommandHandler - generateSpaceFromCommand - Space generation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateASpaceCommandHandlerException(message);
    }
  }

  private async registerSpace(space: SpaceInterface): Promise<void> {
    try {
      await this._repository.create(space);
      this._logger.info(`CreateASpaceCommandHandler - Space ${space.uuid} registered`);
    } catch (e) {
      const message: string = `CreateASpaceCommandHandler - saveSpace - Space registration error: ${e.message}`;
      this._logger.error(message);
      throw new CreateASpaceCommandHandlerException(message);
    }
  }
}
