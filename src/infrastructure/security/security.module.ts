import { Module } from '@nestjs/common';
import { LoggerModule } from '../logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user/user.repository';
import { UserQueryRepository } from './repository/user/user.query-repository';
import { UserCommandRepository } from './repository/user/user.command-repository';
import { UserQueryHandlers } from './query/user';
import { UserCommandHandlers } from './command';
import { BcryptAdapter } from './adapter/bcrypt.adapter';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthService } from './service/auth/auth.service';
import { JsonWebTokenAdapter } from './adapter/jwt/json-web-token.adapter';
import { AuthQueryHandlers } from './query/auth';
import { loginQueryHandlerProvider } from './provider/query/login-query-handler.provider';
import { getOneUserByEmailQueryHandlerProvider } from './provider/query/get-one-user-by-email-query-handler.provider';
import { getOneUserByUuidQueryHandlerProvider } from './provider/query/get-one-user-by-uuid-query-handler.provider';
import { createAUserCommandHandlerProvider } from './provider/command/create-a-user-command-handler.provider';
import { updateAUserCommandHandlerProvider } from './provider/command/update-a-user-command-handler.provider';
import { deleteAUserCommandHandlerProvider } from './provider/command/delete-a-user-command-handler.provider';
import { refreshTokenQueryHandlerProvider } from './provider/query/refresh-token-query-handler.provider';
import { jwtProvider } from './provider/utils/jwt.provider';
import { bcryptProvider } from './provider/utils/bcrypt.provider';
import { SpaceQueryRepository } from './repository/space/space.query-repository';
import { SpaceCommandRepository } from './repository/space/space.command-repository';
import { SpaceRepository } from './repository/space/space.repository';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserRepository, SpaceRepository]),
    LoggerModule,
  ],
  providers: [
    UserQueryRepository,
    UserCommandRepository,
    getOneUserByEmailQueryHandlerProvider,
    getOneUserByUuidQueryHandlerProvider,
    ...UserQueryHandlers,
    createAUserCommandHandlerProvider,
    updateAUserCommandHandlerProvider,
    deleteAUserCommandHandlerProvider,
    ...UserCommandHandlers,
    BcryptAdapter,
    JsonWebTokenAdapter,
    AuthService,
    ...AuthQueryHandlers,
    loginQueryHandlerProvider,
    refreshTokenQueryHandlerProvider,
    jwtProvider,
    bcryptProvider,
    SpaceQueryRepository,
    SpaceCommandRepository,
  ],
  exports: [
    UserQueryRepository,
    UserCommandRepository,
    SpaceQueryRepository,
    SpaceCommandRepository,
    AuthService
  ]
})
export class SecurityModule {}
