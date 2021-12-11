import {
  Body,
  Controller,
  Delete,
  Inject,
  Param,
  Post,
  Put, UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { BaseController } from '../../../base.controller';
import { CreateAUserDto } from '../../dto/user/create-a-user.dto';
import { UserInterface } from '../../../../../../domain/model/security/user.model';
import { CreateAUserCommand } from '../../../../../../application/command/user/create/create-a-user.command';
import { DeleteAUserCommand } from '../../../../../../application/command/user/delete/delete-a-user.command';
import { UpdateAUserCommand } from '../../../../../../application/command/user/update/update-a-user.command';
import { UpdateAUserDto } from '../../dto/user/update-a-user.dto';
import { GetOneUserByUuidQuery } from '../../../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { UserEntity } from '../../../../../../infrastructure/security/entity/user.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import {BindUserToSpaceDto} from "../../dto/user-to-space/bind-user-to-space.dto";
import {UserToSpaceInterface} from "../../../../../../domain/model/security/user-to-space.model";

@Controller('/user/:uuid/space/:spaceUuid')
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
  public async bindUserToSpace(@Body() bindUserToSpaceDto: BindUserToSpaceDto): Promise<UserToSpaceInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateAUserCommand(
        uuid,
        createAUserDto.email,
        createAUserDto.password,
        uuid,
        createAUserDto.roles
      );
      return await this._commandBus.execute(command);
    } catch (e) {
      const message: string = `UserToSpaceController - Bind user to space error: ${e.message}`;
      this.http400Response(message);
    }
  }

  // @Delete('/')
  // @UseGuards(AuthGuard)
  // @Roles('ADMIN', 'SUPER_ADMIN')
  // public async unbindUserToSpace(
  //   @Param('uuid') uuid: string,
  //   @CurrentUser() user: UserInterface
  // ): Promise<UserInterface> {
  //   try {
  //     const command = new DeleteAUserCommand(uuid, user.uuid);
  //     await this._commandBus.execute(command);
  //     return await this.findOneUserByUuid(uuid);
  //   } catch (e) {
  //     const message: string = `UserController - Delete user ${uuid} error: ${e.message}`;
  //     this.http400Response(message);
  //   }
  // }
}
