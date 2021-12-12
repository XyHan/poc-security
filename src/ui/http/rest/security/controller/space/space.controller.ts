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
import { v4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { BaseController } from '../../../base.controller';
import { CreateASpaceDto } from '../../dto/space/create-a-space.dto';
import { CreateASpaceCommand } from '../../../../../../application/command/space/create/create-a-space.command';
import { DeleteASpaceCommand } from '../../../../../../application/command/space/delete/delete-a-space.command';
import { GetOneSpaceByUuidQuery } from '../../../../../../application/query/space/get-one-space-by-uuid/get-one-space-by-uuid.query';
import { SpaceEntity } from '../../../../../../infrastructure/security/entity/space.entity';
import { AuthGuard } from '../../../../guard/auth.guard';
import { CurrentUser } from '../../../../../../infrastructure/security/decorator/current-user.decorator';
import { Roles } from '../../../../../../infrastructure/security/decorator/role.decorator';
import { SpaceInterface } from '../../../../../../domain/model/security/space.model';
import { UserInterface } from '../../../../../../domain/model/security/user.model';

@Controller('/spaces')
export class SpaceController extends BaseController {
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
  public async createASpace(
      @Body() createASpaceDto: CreateASpaceDto,
      @CurrentUser() user: UserInterface
  ): Promise<SpaceInterface> {
    const uuid: string = v4();
    try {
      const command = new CreateASpaceCommand(
        uuid,
        user.uuid,
        createASpaceDto.objectableUuid,
        createASpaceDto.objectableType
      );
      await this._commandBus.execute(command);
    } catch (e) {
      const message: string = `Add space error: ${e.message}`;
      this.http400Response(message);
    }
    return await this.findOneSpaceByUuid(uuid);
  }

  @Delete('/:uuid')
  @UseGuards(AuthGuard)
  @Roles('ADMIN', 'SUPER_ADMIN')
  public async deleteASpace(
    @Param('uuid') uuid: string,
    @CurrentUser() user: UserInterface
  ): Promise<SpaceInterface> {
    try {
      const command = new DeleteASpaceCommand(uuid, user.uuid);
      await this._commandBus.execute(command);
    } catch (e) {
      const message: string = `Delete space ${uuid} error: ${e.message}`;
      this.http400Response(message);
    }
    return await this.findOneSpaceByUuid(uuid);
  }

  private async findOneSpaceByUuid(uuid: string, nullable: boolean = false): Promise<SpaceInterface | null> {
    let space: SpaceInterface | null = null;
    try {
      const query = new GetOneSpaceByUuidQuery(uuid, []);
      space = await this._queryBus.execute(query);
    } catch (e) {
      const message: string = `findOneSpaceByUuid ${uuid} error. Previous: ${e.message}`;
      this.http400Response(message);
    }
    if (!space && !nullable) {
      const message: string = `Space ${uuid} not found`;
      this.http404Response(message);
    }
    return space;
  }
}
