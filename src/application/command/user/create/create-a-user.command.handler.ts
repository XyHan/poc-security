import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserCommandRepositoryInterface } from '../../../../domain/repository/user/user.command-repository.interface';
import { CreateAUserCommand } from './create-a-user.command';
import { UserInterface, UserModel } from '../../../../domain/model/security/user.model';
import { UserFactory } from '../../../../domain/factory/user.factory';
import { CreateAUserCommandHandlerException } from './create-a-user.command.handler.exception';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';

export class CreateAUserCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: UserCommandRepositoryInterface;
  protected readonly _logger: LoggerInterface;
  protected readonly _encrypter: EncrypterInterface;

  constructor(
    repository: UserCommandRepositoryInterface,
    logger: LoggerInterface,
    encrypter: EncrypterInterface,
  ) {
    this._repository = repository;
    this._logger = logger;
    this._encrypter = encrypter;
  }

  public async handle(command: CreateAUserCommand): Promise<void> {
    const user: UserInterface = await this.generateUserFromCommand(command);
    await this.registerUser(user);
  }

  private async generateUserFromCommand(command: CreateAUserCommand): Promise<UserInterface> {
    try {
      const salt: string = await this._encrypter.salt();
      const hashedPassword: string = await this._encrypter.hash(command.password, salt);
      return new UserFactory(new UserModel()).generate(
        command.uuid,
        1,
        command.email,
        hashedPassword,
        salt,
        new Date(),
        command.createdBy,
        new Date(),
        command.createdBy
      );
    } catch (e) {
      const message: string = `CreateAUserCommandHandler - generateUserFromCommand - User generation error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAUserCommandHandlerException(message);
    }
  }

  private async registerUser(user: UserInterface): Promise<void> {
    try {
      await this._repository.create(user);
      this._logger.info(`CreateAUserCommandHandler - User ${user.uuid} registered`);
    } catch (e) {
      const message: string = `CreateAUserCommandHandler - saveUser - User registration error: ${e.message}`;
      this._logger.error(message);
      throw new CreateAUserCommandHandlerException(message);
    }
  }
}
