import { createParamDecorator } from '@nestjs/common';
import { UserInterface } from '../../../domain/model/user/user.model';
import { plainToClass } from 'class-transformer';
import { UserEntity } from '../entity/user.entity';
import { SecurityModule } from '../security.module';

export const CurrentUser = createParamDecorator(() => {
  const user: UserInterface | any = Reflect.getMetadata('currentUser', SecurityModule)
  return plainToClass(UserEntity, user, { strategy: 'excludeAll', excludeExtraneousValues: true });
});
