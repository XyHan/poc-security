import { IQueryHandler, QueryHandler } from '@nestjs/cqrs/dist';
import { Inject } from '@nestjs/common';
import { SpaceInterface } from '../../../../domain/model/security/space.model';
import { QueryHandlerInterface } from '../../../../application/query/query-handler.interface';
import {
  GetOneSpaceByObjectableUuidQuery
} from '../../../../application/query/space/get-one-space-by-objectable-uuid/get-one-space-by-objectable-uuid.query';

@QueryHandler(GetOneSpaceByObjectableUuidQuery)
export class GetOneSpaceByObjectableUuidQueryHandlerAdapter implements IQueryHandler {
  private readonly _queryHandler: QueryHandlerInterface;

  constructor(@Inject('GET_ONE_SPACE_BY_OBJECTABLE_UUID_QUERY_HANDLER') queryHandler: QueryHandlerInterface) {
    this._queryHandler = queryHandler;
  }

  async execute(query: GetOneSpaceByObjectableUuidQuery): Promise<SpaceInterface | null> {
    return await this._queryHandler.handle(query);
  }
}
