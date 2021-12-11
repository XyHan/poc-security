import { GetOneSpaceByUuidQueryHandlerAdapter } from './get-one-space-by-uuid.query.handler.adapter';
import { GetOneSpaceByObjectableUuidQueryHandlerAdapter } from './get-one-space-by-objectable-uuid.query.handler.adapter';

export const SpaceQueryHandlers = [
  GetOneSpaceByUuidQueryHandlerAdapter,
  GetOneSpaceByObjectableUuidQueryHandlerAdapter
];
