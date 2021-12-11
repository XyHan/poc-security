import { EntityRepository, Repository } from 'typeorm';
import { SpaceEntity } from '../../entity/space.entity';

@EntityRepository(SpaceEntity)
export class SpaceRepository extends Repository<SpaceEntity> {}
