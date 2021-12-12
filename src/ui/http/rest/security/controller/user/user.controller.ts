import {
  Body,
  Controller,
  Delete,
  Get,
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
import { BaseController } from '../../../base.controller';
import { CreateAUserDto } from '../../dto/user/create-a-user.dto';
import { UserInterface } from '../../../../../../domain/model/security/user.model';
import { CreateAUserCommand } from '../../../../../../application/command/user/create/create-a-user.command';
import { DeleteAUserCommand } from '../../../../../../application/command/user/delete/delete-a-user.command';
import { UpdateAUserCommand } from '../../../../../../application/command/user/update/update-a-user.command';
import { UpdateAUserDto } from '../../dto/user/update-a-user.dto';
import { GetOneUserByUuidQuery } from '../../../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
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
  public async createAUser(@Body() createAUserDto: CreateAUserDto): Promise<UserInterface> {
    const uuid: string = v4();
    try {
      const command = new CreateAUserCommand(
        uuid,
        createAUserDto.email,
        createAUserDto.password,
        uuid,
        createAUserDto.roles
      );
      await this._commandBus.execute(command);
    } catch (e) {
      const message: string = `Add user error: ${e.message}`;
      this.http400Response(message);
    }
    return await this.findOneUserByUuid(uuid);
  }

  @Put('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateAUser(
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
    } catch (e) {
      const message: string = `Update ${uuid} user error: ${e.message}`;
      this.http400Response(message);
    }
    return await this.findOneUserByUuid(uuid);
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async deleteAUser(
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface
  ): Promise<UserInterface> {
    try {
      const command = new DeleteAUserCommand(uuid, user.uuid);
      await this._commandBus.execute(command);
    } catch (e) {
      const message: string = `Delete user ${uuid} error: ${e.message}`;
      this.http400Response(message);
    }
    return await this.findOneUserByUuid(uuid);
  }

  @Get('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async getOneUser(@Param('uuid') uuid: string): Promise<UserInterface> {
    return await this.findOneUserByUuid(uuid);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async getMyUser(@CurrentUser() user: UserInterface): Promise<UserInterface> {
    return await this.findOneUserByUuid(user.uuid);
  }

  private async findOneUserByUuid(uuid: string, nullable: boolean = false): Promise<UserInterface | null> {
    let user: UserInterface | null = null;
    try {
      const query = new GetOneUserByUuidQuery(uuid, []);
      user = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `findOneUserByUuid ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!user && !nullable) {
      const message: string = `User ${uuid} not found`;
      this.http404Response(message);
    }
    return user;
  }
}
