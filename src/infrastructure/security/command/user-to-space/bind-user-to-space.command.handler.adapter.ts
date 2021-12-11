import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';
import {
  BindUserToSpaceCommand
} from '../../../../application/command/user-to-space/bind-user-to-space/bind-user-to-space.command';

@CommandHandler(BindUserToSpaceCommand)
export class BindUserToSpaceCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('BIND_USER_TO_SPACE_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: BindUserToSpaceCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
