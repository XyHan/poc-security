import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';
import { LoginQuery } from '../../../../application/query/auth/login/login.query';
import { TokenInterface } from '../../../../domain/model/auth/token.model';

@QueryHandler(LoginQuery)
export class LoginQueryHandlerAdapter implements IQueryHandler {
  private _queryHandler: QueryHandlerInterface;

  constructor(@Inject('LOGIN_QUERY_HANDLER') handler: QueryHandlerInterface) {
    this._queryHandler = handler;
  }

  async execute(query: LoginQuery): Promise<TokenInterface> {
    return await this._queryHandler.handle(query);
  }
}
