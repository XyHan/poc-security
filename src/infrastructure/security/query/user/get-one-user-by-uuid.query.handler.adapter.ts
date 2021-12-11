import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { GetOneUserByUuidQuery } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { UserInterface } from '../../../../domain/model/user/user.model';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(GetOneUserByUuidQuery)
export class GetOneUserByUuidQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_USER_BY_UUID_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneUserByUuidQuery): Promise<UserInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
