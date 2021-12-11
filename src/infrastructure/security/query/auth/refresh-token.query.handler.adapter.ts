import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';
import { TokenInterface } from '../../../../domain/model/auth/token.model';
import { RefreshTokenQuery } from '../../../../application/query/auth/refresh-token/refresh-token.query';

@QueryHandler(RefreshTokenQuery)
export class RefreshTokenQueryHandlerAdapter implements IQueryHandler {
  private _queryHandler: QueryHandlerInterface;

  constructor(@Inject('REFRESH_TOKEN_QUERY_HANDLER') handler: QueryHandlerInterface) {
    this._queryHandler = handler;
  }

  async execute(query: RefreshTokenQuery): Promise<TokenInterface> {
    return await this._queryHandler.handle(query);
  }
}
