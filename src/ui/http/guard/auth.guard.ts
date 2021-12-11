import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { AuthService } from '../../../infrastructure/security/service/auth/auth.service';
import { AuthManagerInterface } from '../../../domain/utils/security/auth-manager.interface';
import { TokenInterface, TokenModel } from '../../../domain/model/auth/token.model';
import { UserInterface } from '../../../domain/model/security/user.model';
import { RolesValueObject } from '../../../infrastructure/security/value-object/roles.value-object';
import { Reflector } from '@nestjs/core';
import { IncomingMessage } from 'http';
import { SecurityModule } from '../../../infrastructure/security/security.module';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AuthService) private readonly authService: AuthManagerInterface,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const headers = this.validHeaders(context);
      const token: TokenInterface = new TokenModel(headers.headers.authorization);
      const user: UserInterface | undefined = await this.authService.isValidUser(token);
      if (user && this.areValidRoles(user, context)) {
        Reflect.defineMetadata('currentUser', user, SecurityModule);
        return true;
      }
      return false;
    } catch (e) {
      throw new UnauthorizedException('[AuthGuard] Bad credentials');
    }
  }

  private validHeaders(context: ExecutionContext): IncomingMessage {
    const headers = _.find(context.getArgs(), 'headers');
    if (!headers || !headers.headers || !headers.headers.authorization) {
      throw new UnauthorizedException('[AuthGuard] A valid token is required');
    }
    return headers;
  }

  private areValidRoles(user: UserInterface,context: ExecutionContext): boolean {
    const entrypointAvailableRoles: string[] = this.reflector.get<string[]>('roles', context.getHandler()) || [];
    // return security
    //   && security.roles
    //   && security.roles.some((role: string) =>
    //     RolesValueObject.isValidRole(role) && entrypointAvailableRoles.some((entrypointAvailableRole: string) => entrypointAvailableRole === role)
    //   );
    return true;
  }
}
