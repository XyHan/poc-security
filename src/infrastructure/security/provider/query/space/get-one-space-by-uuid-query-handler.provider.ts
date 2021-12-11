import { FactoryProvider } from '@nestjs/common';
import { SpaceQueryRepositoryInterface } from '../../../../../domain/repository/space/space.query-repository.interface';
import { LoggerInterface } from '../../../../../domain/utils/logger/logger.interface';
import { SpaceQueryRepository } from '../../../repository/space/space.query-repository';
import { LoggerAdapterService } from '../../../../logger/logger-adapter.service';
import { GetOneSpaceByUuidQueryHandler } from '../../../../../application/query/space/get-one-space-by-uuid/get-one-space-by-uuid.query.handler';

export const getOneSpaceByUuidQueryHandlerProvider: FactoryProvider = {
  provide: 'GET_ONE_SPACE_BY_UUID_QUERY_HANDLER',
  useFactory: (spaceRepository: SpaceQueryRepositoryInterface, logger: LoggerInterface) => {
    return new GetOneSpaceByUuidQueryHandler(spaceRepository, logger);
  },
  inject: [SpaceQueryRepository, LoggerAdapterService],
}
