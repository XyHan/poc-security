import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DeleteAUserCommand } from '../../../application/command/user/delete/delete-a-user.command';
import { CommandHandlerInterface } from '../../../application/command/command-handler.interface';

@CommandHandler(DeleteAUserCommand)
export class DeleteAUserCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('DELETE_A_USER_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: DeleteAUserCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
