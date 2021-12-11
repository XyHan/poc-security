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
import { CreateAUserDto } from '../../dto/create-a-user.dto';
import { UserInterface } from '../../../../../../domain/model/user/user.model';
import { CreateAUserCommand } from '../../../../../../application/command/user/create/create-a-user.command';
import { DeleteAUserCommand } from '../../../../../../application/command/user/delete/delete-a-user.command';
import { UpdateAUserCommand } from '../../../../../../application/command/user/update/update-a-user.command';
import { UpdateAUserDto } from '../../dto/update-a-user.dto';
import { GetOneUserByUuidQuery } from '../../../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { UserEntity } from '../../../../../../infrastructure/security/entity/user.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { RolesValueObject } from '../../../../../../infrastructure/security/value-object/roles.value-object';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';

@Controller('/users')
export class UserController extends BaseController {
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
  public async post(@Body() createAUserDto: CreateAUserDto): Promise<UserInterface> {
    try {
      const uuid: string = v4();
      const command = new CreateAUserCommand(
        uuid,
        createAUserDto.email,
        createAUserDto.password,
        uuid,
        [RolesValueObject.availableUserRoles[2]]
      );
      await this._commandBus.execute(command);
      return await this.findOneUserByUuid(uuid);
    } catch (e) {
      const message: string = `UserController - Add user error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Put('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async put(
    @Body() updateAUserDto: UpdateAUserDto,
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface,
  ): Promise<UserInterface> {
    try {
      const command = new UpdateAUserCommand(
        uuid,
        updateAUserDto.status,
        updateAUserDto.email,
        user.uuid,
        updateAUserDto.roles
      );
      await this._commandBus.execute(command);
      return await this.findOneUserByUuid(uuid);
    } catch (e) {
      const message: string = `UserController - Update ${uuid} user error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async delete(
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface
  ): Promise<UserInterface> {
    try {
      const command = new DeleteAUserCommand(uuid, user.uuid);
      await this._commandBus.execute(command);
      return await this.findOneUserByUuid(uuid);
    } catch (e) {
      const message: string = `UserController - Delete user ${uuid} error: ${e.message}`;
      this.http400Response(message);
    }
  }

  private async findOneUserByUuid(uuid: string, nullable: boolean = false): Promise<UserInterface | null> {
    let user: UserInterface | null = null;
    try {
      const query = new GetOneUserByUuidQuery(uuid, []);
      user = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = ` UserController - findOneUserByUuid ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!user && !nullable) {
      const message: string = ` UserController - User ${uuid} not found`;
      this.http404Response(message);
    }

    return plainToClass(UserEntity, user);
  }
}
