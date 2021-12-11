import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { UpdateAUserCommand } from '../../../application/command/user/update/update-a-user.command';
import { CommandHandlerInterface } from '../../../application/command/command-handler.interface';

@CommandHandler(UpdateAUserCommand)
export class UpdateAUserCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('UPDATE_A_USER_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: UpdateAUserCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
