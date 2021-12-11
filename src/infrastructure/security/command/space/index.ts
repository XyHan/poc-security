import { CreateASpaceCommandHandlerAdapter } from './create-a-space.command.handler.adapter';
import { DeleteASpaceCommandHandlerAdapter } from './delete-a-space.command.handler.adapter';

export const SpaceCommandHandlers = [
  CreateASpaceCommandHandlerAdapter,
  DeleteASpaceCommandHandlerAdapter
];
