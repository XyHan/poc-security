import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { BaseController } from '../../../base.controller';
import { UserInterface } from '../../../../../../domain/model/security/user.model';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { BindUserToSpaceDto } from '../../dto/user-to-space/bind-user-to-space.dto';
import { UserToSpaceInterface } from '../../../../../../domain/model/security/user-to-space.model';
import {
  BindUserToSpaceCommand
} from '../../../../../../application/command/user-to-space/bind-user-to-space/bind-user-to-space.command';
import {
  UnbindUserToSpaceCommand
} from '../../../../../../application/command/user-to-space/unbind-user-to-space/unbind-user-to-space.command';

@Controller('/user/:userUuid/space/:spaceUuid')
export class UserToSpaceController extends BaseController {
  private readonly _queryBus: IQueryBus;
  private readonly _commandBus: ICommandBus;
  protected readonly _logger: LoggerInterface;

  constructor(
    @Inject(QueryBus) queryBus: IQueryBus,
    @Inject(CommandBus) commandBus: ICommandBus,
    @Inject(LoggerAdapterService) logger: LoggerInterface,
  ) {
    super(logger);
    this._queryBus = queryBus;
    this._commandBus = commandBus;
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async bindUserToSpace(
    @Param('userUuid') userUuid: string,
    @Param('spaceUuid') spaceUuid: string,
    @Body() bindUserToSpaceDto: BindUserToSpaceDto,
    @CurrentUser() user: UserInterface
  ): Promise<UserToSpaceInterface> {
    try {
      const command = new BindUserToSpaceCommand(
        spaceUuid,
        userUuid,
        user.uuid,
        bindUserToSpaceDto.permissions,
      );
      return await this._commandBus.execute(command);
    } catch (e) {
      const message: string = `UserToSpaceController - Bind user ${userUuid} to space ${spaceUuid} - error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Delete('/')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async unbindUserToSpace(
    @Param('userUuid') userUuid: string,
    @Param('spaceUuid') spaceUuid: string,
    @CurrentUser() user: UserInterface
  ): Promise<{ message: string }> {
    try {
      const command = new UnbindUserToSpaceCommand(spaceUuid, userUuid);
      await this._commandBus.execute(command);
      return { message: `user ${userUuid} and space ${spaceUuid} have been unbound` };
    } catch (e) {
      const message: string = `UserToSpaceController - Unbind user ${userUuid} to space ${spaceUuid} - error: ${e.message}`;
      this.http400Response(message);
    }
  }
}
