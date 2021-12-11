import { CommandInterface } from './command.interface';

export interface CommandHandlerInterface {
  handle(command: CommandInterface): Promise<any>;
}
