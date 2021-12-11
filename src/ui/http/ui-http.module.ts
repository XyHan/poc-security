import { Module } from '@nestjs/common';
import { AppController } from './rest/app/app.controller';
import { AppModule } from '../../infrastructure/app/app.module';
import { CqrsModule } from '@nestjs/cqrs';
import { LoggerModule } from '../../infrastructure/logger/logger.module';
import { UserController } from './rest/security/controller/user/user.controller';
import { SecurityModule } from '../../infrastructure/security/security.module';
import { AuthController } from './rest/security/controller/auth/auth.controller';
import { AuthGuard } from './guard/auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigModule } from '../../infrastructure/config/config.module';
import { ConfigService } from '../../infrastructure/config/config.service';
import { SpaceController } from './rest/security/controller/space/space.controller';
import { UserToSpaceController } from './rest/security/controller/user-to-space/user-to-space.controller';

@Module({
  imports: [
    AppModule,
    CqrsModule,
    SecurityModule,
    LoggerModule,
    ConfigModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.storageDir,
      }),
      inject: [ConfigService],
    })
  ],
  providers: [
    AuthGuard,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    SpaceController,
    UserToSpaceController
  ],
})
export class UiHttpModule {}
