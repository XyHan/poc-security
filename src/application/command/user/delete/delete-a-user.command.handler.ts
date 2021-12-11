import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { DeleteAUserCommandHandlerException } from './delete-a-user.command.handler.exception';
import { DeleteAUserCommand } from './delete-a-user.command';

export class DeleteAUserCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: UserCommandRepositoryInterface;
  protected readonly _queryRepository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: UserCommandRepositoryInterface,
    queryRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
  }

  async handle(command: DeleteAUserCommand): Promise<void> {
    const user: UserInterface = await this.findOneUserByUuid(command.uuid);
    if (!user) throw new DeleteAUserCommandHandlerException(`DeleteAUserCommandHandler - User ${command.uuid} not found`);
    await this.updateUser(user, command);
    this._logger.info(`DeleteAUserCommandHandler - User ${user.uuid} deleted`);
  }

  private async findOneUserByUuid(uuid: string): Promise<UserInterface> {
    try {
      return await this._queryRepository.findOneByUuid(uuid, []);
    } catch (e) {
      const message: string = `DeleteAUserCommandHandler - findOneUserByUuid - User ${uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteAUserCommandHandlerException(message);
    }
  }

  private async updateUser(user: UserInterface, command: DeleteAUserCommand): Promise<void> {
    try {
      user.status = 0;
      user.updatedBy = command.updatedBy;
      user.updatedAt = new Date();
      await this._commandRepository.update(user);
    } catch (e) {
      const message: string = `DeleteAUserCommandHandler - updateUser - User ${user.uuid} error: ${e.message}`;
      this._logger.error(message);
      throw new DeleteAUserCommandHandlerException(message);
    }
  }
}
