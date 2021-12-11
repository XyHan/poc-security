import { BindUserToSpaceCommandHandlerAdapter } from './bind-user-to-space.command.handler.adapter';
import { UnbindUserToSpaceCommandHandlerAdapter } from './unbind-user-to-space.command.handler.adapter';

export const UserToSpaceCommandHandlers = [
  BindUserToSpaceCommandHandlerAdapter,
  UnbindUserToSpaceCommandHandlerAdapter
];
