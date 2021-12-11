import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CreateAUserCommand } from '../../../application/command/user/create/create-a-user.command';
import { CommandHandlerInterface } from '../../../application/command/command-handler.interface';

@CommandHandler(CreateAUserCommand)
export class CreateAUserCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('CREATE_A_USER_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: CreateAUserCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
