import { LoggerInterface } from '../../../../domain/utils/logger/logger.interface';
import { CommandHandlerInterface } from '../../command-handler.interface';
import { UserToSpaceInterface } from '../../../../domain/model/security/user-to-space.model';
import {
  UserToSpaceCommandRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.command-repository.interface';
import {
  UserToSpaceQueryRepositoryInterface
} from '../../../../domain/repository/user-to-space/user-to-space.query-repository.interface';
import { UnbindUserToSpaceCommand } from './unbind-user-to-space.command';
import { UnbindUserToSpaceCommandHandlerException } from './unbind-user-to-space.command.handler.exception';
import { UserInterface } from '../../../../domain/model/security/user.model';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { UserQueryRepositoryInterface } from '../../../../domain/repository/user/user.query-repository.interface';
import { SpaceQueryRepositoryInterface } from '../../../../domain/repository/space/space.query-repository.interface';

export class UnbindUserToSpaceCommandHandler implements CommandHandlerInterface {
  protected readonly _commandRepository: UserToSpaceCommandRepositoryInterface;
  protected readonly _queryRepository: UserToSpaceQueryRepositoryInterface;
  protected readonly _userRepository: UserQueryRepositoryInterface;
  protected readonly _spaceRepository: SpaceQueryRepositoryInterface;
  protected readonly _logger: LoggerInterface;

  constructor(
    commandRepository: UserToSpaceCommandRepositoryInterface,
    queryRepository: UserToSpaceQueryRepositoryInterface,
    userRepository: UserQueryRepositoryInterface,
    spaceRepository: SpaceQueryRepositoryInterface,
    logger: LoggerInterface
  ) {
    this._commandRepository = commandRepository;
    this._queryRepository = queryRepository;
    this._userRepository = userRepository;
    this._spaceRepository = spaceRepository;
    this._logger = logger;
  }

  public async handle(command: UnbindUserToSpaceCommand): Promise<void> {
    const user: UserInterface = await this.findOneUserByUuidOrException(command.userUuid);
    const space: SpaceInterface = await this.findOneSpaceByUuidOrException(command.spaceUuid);
    const userToSpaceBinding = await this.findOneUserToSpaceByUserUuidAndSpaceUuidOrException(user, space);
    await this.unbindUserToSpace(userToSpaceBinding);
  }

  private async unbindUserToSpace(userToSpace: UserToSpaceInterface): Promise<void> {
    try {
      await this._commandRepository.delete(userToSpace);
      this._logger.info(`BindUserToSpaceCommandHandler - BindUserToSpace user ${userToSpace.user.uuid} and space ${userToSpace.space.uuid} are now bound`);
    } catch (e) {
      const message: string = `BindUserToSpaceCommandHandler - bindUserToSpace - user ${userToSpace.user.uuid} | space ${userToSpace.space.uuid}. Error: ${e.message}`;
      this._logger.error(message);
      throw new UnbindUserToSpaceCommandHandlerException(message);
    }
  }

  private async findOneUserToSpaceByUserUuidAndSpaceUuidOrException(user: UserInterface, space: SpaceInterface): Promise<UserToSpaceInterface> {
    let userToSpace: UserToSpaceInterface | null = null;
    try {
      userToSpace = await this._queryRepository.findOneByUserAndSpace(user, space, []);
    } catch (e) {
      const message: string = `UnbindUserToSpaceCommandHandler - findOneUserToSpaceByUserUuidAndSpaceUuidOrException - user ${user.uuid} | space ${space.uuid}. Error: ${e.message}`;
      this._logger.error(message);
      throw new UnbindUserToSpaceCommandHandlerException(message);
    }

    if (!userToSpace) {
      throw new UnbindUserToSpaceCommandHandlerException(
          `UnbindUserToSpaceCommandHandler - findOneUserToSpaceByUserUuidAndSpaceUuidOrException - userToSpace not found with user ${user.uuid} | space ${space.uuid}`
      );
    }

    return userToSpace;
  }

  private async findOneUserByUuidOrException(userUuid: string): Promise<UserInterface> {
    let user: UserInterface | null = null;
    try {
      user = await this._userRepository.findOneByUuid(userUuid, []);
    } catch (e) {
      const message: string = `BindUserToSpaceCommandHandler - findOneUserByUuidOrException - user ${userUuid}. Error: ${e.message}`;
      this._logger.error(message);
      throw new UnbindUserToSpaceCommandHandlerException(message);
    }

    if (!user) {
      throw new UnbindUserToSpaceCommandHandlerException(`BindUserToSpaceCommandHandler - findOneUserByUuidOrException - user ${userUuid} not found`);
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
      throw new UnbindUserToSpaceCommandHandlerException(message);
    }

    if (!space) {
      throw new UnbindUserToSpaceCommandHandlerException(`BindUserToSpaceCommandHandler - findOneSpaceByUuidOrException - space ${spaceUuid} not found`);
    }

    return space;
  }
}
