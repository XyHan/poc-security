import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { ChangePasswordCommand } from './change-password.command';
import { ChangePasswordCommandHandlerException } from './change-password.command.handler.exception';

export class ChangePasswordCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: UserCommandRepositoryInterface;
  protected readonly _queryRepository: UserQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;
  protected readonly _encrypter: EncrypterInterface;

  constructor(
    commandRepository: UserCommandRepositoryInterface,
    queryRepository: UserQueryRepositoryInterface,
    logger: LoggerInterface,
    encrypter: EncrypterInterface,
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._logger = logger;
    this._encrypter = encrypter;
  }

  public async handle(command: ChangePasswordCommand): Promise<void> {
    const user: UserInterface = await this.findOneUserByUuid(command.uuid);
    const updatedUser: UserInterface = await this.updateUserFromCommand(command, user);
    await this.saveUpdatedUser(updatedUser);
  }

  private async updateUserFromCommand(command: ChangePasswordCommand, user: UserInterface): Promise<UserInterface> {
    try {
      const salt: string = await this._encrypter.salt();
      user.password = await this._encrypter.hash(command.password, salt);
      user.salt = salt;
      user.updatedAt = new Date();
      user.updatedBy = command.updatedBy;
      return user;
    } catch (e) {
      const message: string = `ChangePasswordCommandHandler - updateUserFromCommand - User generation error: ${e.message}`;
      this._logger.error(message);
      throw new ChangePasswordCommandHandlerException(message);
    }
  }

  private async saveUpdatedUser(user: UserInterface): Promise<void> {
    try {
      await this._commandRepository.update(user);
      this._logger.info(`ChangePasswordCommandHandler - User ${user.uuid} updated`);
    } catch (e) {
      const message: string = `ChangePasswordCommandHandler - saveUpdatedUser - User update error: ${e.message}`;
      this._logger.error(message);
      throw new ChangePasswordCommandHandlerException(message);
    }
  }

  private async findOneUserByUuid(uuid: string): Promise<UserInterface> {
    try {
      return await this._queryRepository.findOneByUuid(uuid, []);
    } catch (e) {
      throw new ChangePasswordCommandHandlerException(e.message);
    }
  }
}
