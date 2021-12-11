import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { DeleteASpaceCommand } from '../../../../application/command/space/delete/delete-a-space.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(DeleteASpaceCommand)
export class DeleteASpaceCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('DELETE_A_SPACE_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: DeleteASpaceCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
