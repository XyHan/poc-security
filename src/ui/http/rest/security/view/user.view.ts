import { UserEntity } from '../../../../../infrastructure/security/entity/user.entity';
import { Exclude } from 'class-transformer';

export class UserView extends UserEntity {
  @Exclude()
  public password: string;
}
