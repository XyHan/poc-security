import { LoginQueryHandlerAdapter } from './login.query.handler.adapter';
import { RefreshTokenQueryHandlerAdapter } from './refresh-token.query.handler.adapter';

export const AuthQueryHandlers = [
  LoginQueryHandlerAdapter,
  RefreshTokenQueryHandlerAdapter
];
