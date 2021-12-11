import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';
import {
  UnbindUserToSpaceCommand
} from '../../../../application/command/user-to-space/unbind-user-to-space/unbind-user-to-space.command';

@CommandHandler(UnbindUserToSpaceCommand)
export class UnbindUserToSpaceCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('UNBIND_USER_TO_SPACE_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: UnbindUserToSpaceCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
