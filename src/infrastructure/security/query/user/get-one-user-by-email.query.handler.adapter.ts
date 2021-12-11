import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { GetOneUserByEmailQuery } from '../../../../application/query/user/get-one-user-by-email/get-one-user-by-email.query';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(GetOneUserByEmailQuery)
export class GetOneUserByEmailQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_USER_BY_EMAIL_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneUserByEmailQuery): Promise<UserInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
