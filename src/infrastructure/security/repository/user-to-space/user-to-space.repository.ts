import { EntityRepository, Repository } from 'typeorm';
import { UserToSpaceEntity } from '../../entity/user-to-space.entity';

@EntityRepository(UserToSpaceEntity)
export class UserToSpaceRepository extends Repository<UserToSpaceEntity> {}
