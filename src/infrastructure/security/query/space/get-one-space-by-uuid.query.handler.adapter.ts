import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { GetOneSpaceByUuidQuery } from '../../../../application/query/space/get-one-space-by-uuid/get-one-space-by-uuid.query';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';

@QueryHandler(GetOneSpaceByUuidQuery)
export class GetOneSpaceByUuidQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_SPACE_BY_UUID_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneSpaceByUuidQuery): Promise<SpaceInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
