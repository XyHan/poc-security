import { CreateAUserCommandHandlerAdapter } from './create-a-user.command.handler.adapter';
import { DeleteAUserCommandHandlerAdapter } from './delete-a-user.command.handler.adapter';
import { UpdateAUserCommandHandlerAdapter } from './update-a-user.command.handler.adapter';

export const UserCommandHandlers = [
  CreateAUserCommandHandlerAdapter,
  DeleteAUserCommandHandlerAdapter,
  UpdateAUserCommandHandlerAdapter
];
