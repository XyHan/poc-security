import { GetOneUserByUuidQueryHandlerAdapter } from './get-one-user-by-uuid.query.handler.adapter';
import { GetOneUserByEmailQueryHandlerAdapter } from './get-one-user-by-email.query.handler.adapter';

export const UserQueryHandlers = [
  GetOneUserByUuidQueryHandlerAdapter,
  GetOneUserByEmailQueryHandlerAdapter
];
