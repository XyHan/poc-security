import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserInterface } from '../../../../domain/model/security/user.model';
import { UserToSpaceFactory } from '../../../../domain/factory/bind-user-to-space.factory';
import { UserToSpaceInterface, UserToSpaceModel } from '../../../../domain/model/security/user-to-space.model';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { BindUserToSpaceCommand } from './bind-user-to-space.command';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import { BindUserToSpaceCommandHandlerException } from './bind-user-to-space.command.handler.exception';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';

export class BindUserToSpaceCommandHandler implements CommandHandlerInterface {
  protected readonly _repository: UserToSpaceCommandRepositoryInterface;
  protected readonly _userRepository: UserQueryRepositoryInterface;
  protected readonly _spaceRepository: SpaceQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    repository: UserToSpaceCommandRepositoryInterface,
    userRepository: UserQueryRepositoryInterface,
    spaceRepository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._repository = repository;
    this._userRepository = userRepository;
    this._spaceRepository = spaceRepository;
    this._logger = logger;
  }

  public async handle(command: BindUserToSpaceCommand): Promise<UserToSpaceInterface> {
    const user = await this.findOneUserByUuidOrException(command.userUuid);
    const space = await this.findOneSpaceByUuidOrException(command.spaceUuid);
    const userToSpaceBinding: UserToSpaceInterface = await new UserToSpaceFactory(new UserToSpaceModel()).generate(
        user,
        space,
        new Date(),
        command.createdBy,
        command.permissions
    );
    await this.bindUserToSpace(userToSpaceBinding);
    return userToSpaceBinding;
  }

  private async bindUserToSpace(userToSpaceBinding: UserToSpaceInterface): Promise<void> {
    try {
      await this._repository.create(userToSpaceBinding);
      this._logger.info(`BindUserToSpaceCommandHandler - BindUserToSpace user ${userToSpaceBinding.user.uuid} and space ${userToSpaceBinding.space.uuid} are now bound`);
    } catch (e) {
      const message: string = `BindUserToSpaceCommandHandler - bindUserToSpace - user ${userToSpaceBinding.user.uuid} | space ${userToSpaceBinding.space.uuid}. Error: ${e.message}`;
      this._logger.error(message);
      throw new BindUserToSpaceCommandHandlerException(message);
    }
  }

  private async findOneUserByUuidOrException(userUuid: string): Promise<UserInterface> {
    let user: UserInterface | null = null;
    try {
      user = await this._userRepository.findOneByUuid(userUuid, []);
    } catch (e) {
      const message: string = `BindUserToSpaceCommandHandler - findOneUserByUuidOrException - user ${userUuid}. Error: ${e.message}`;
      this._logger.error(message);
      throw new BindUserToSpaceCommandHandlerException(message);
    }

    if (!user) {
      throw new BindUserToSpaceCommandHandlerException(`BindUserToSpaceCommandHandler - findOneUserByUuidOrException - user ${userUuid} not found`);
    }

    return user;
  }

  private async findOneSpaceByUuidOrException(spaceUuid: string): Promise<SpaceInterface> {
    let space: SpaceInterface | null = null;
    try {
      space = await this._spaceRepository.findOneByUuid(spaceUuid, []);
    } catch (e) {
      const message: string = `BindUserToSpaceCommandHandler - findOneSpaceByUuidOrException - space ${spaceUuid}. Error: ${e.message}`;
      this._logger.error(message);
      throw new BindUserToSpaceCommandHandlerException(message);
    }

    if (!space) {
      throw new BindUserToSpaceCommandHandlerException(`BindUserToSpaceCommandHandler - findOneSpaceByUuidOrException - space ${spaceUuid} not found`);
    }

    return space;
  }
}
