import { CommandHandler, ICommandHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { CreateASpaceCommand } from '../../../../application/command/space/create/create-a-space.command';
import { CommandHandlerInterface } from '../../../../application/command/command-handler.interface';

@CommandHandler(CreateASpaceCommand)
export class CreateASpaceCommandHandlerAdapter implements ICommandHandler {
  private readonly _commandHandler: CommandHandlerInterface;

  constructor(@Inject('CREATE_A_SPACE_COMMAND_HANDLER') commandHandler: CommandHandlerInterface) {
    this._commandHandler = commandHandler;
  }

  async execute(command: CreateASpaceCommand): Promise<void> {
    return await this._commandHandler.handle(command);
  }
}
