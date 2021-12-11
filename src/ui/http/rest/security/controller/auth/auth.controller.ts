import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Post,
  Req,
} from '@nestjs/common';
import { CommandBus, ICommandBus, IQueryBus, QueryBus } from '@nestjs/cqrs';
import { LoggerInterface } from '../../../../../../domain/utils/logger/logger.interface';
import { LoggerAdapterService } from '../../../../../../infrastructure/logger/logger-adapter.service';
import { BaseController } from '../../../base.controller';
import { TokenInterface, TokenModel } from '../../../../../../domain/model/auth/token.model';
import { LoginQuery } from '../../../../../../application/query/auth/login/login.query';
import { LoginDto } from '../../dto/login.dto';
import { plainToClass } from 'class-transformer';
import { TokenTransformer } from '../../../../../../infrastructure/security/transformer/token.transformer';
import { IncomingMessage } from 'http';
import { RefreshTokenQuery } from '../../../../../../application/query/auth/refresh-token/refresh-token.query';

@Controller()
export class AuthController extends BaseController {
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

  @Post('login')
  @HttpCode(200)
  public async login(@Body() loginDto: LoginDto): Promise<TokenInterface> {
    try {
      const query = new LoginQuery(loginDto.email, loginDto.password);
      const token: TokenInterface = await this._queryBus.execute(query);
      return plainToClass(TokenTransformer, token, { strategy: 'excludeAll', excludeExtraneousValues: true })
    } catch (e) {
      const message: string = `AuthController - login error: ${e.message}`;
      this.http400Response(message);
    }
  }

  @Get('refresh-token')
  public async refreshToken(@Req() request: IncomingMessage): Promise<TokenInterface> {
    const bearerToken: string | undefined = request.headers?.authorization;
    if (!bearerToken) this.http401Response('Invalid token');
    try {
      const query = new RefreshTokenQuery(new TokenModel(bearerToken));
      const token: TokenInterface = await this._queryBus.execute(query);
      return plainToClass(TokenTransformer, token, { strategy: 'excludeAll', excludeExtraneousValues: true })
    } catch (e) {
      const message: string = `AuthController - login error: ${e.message}`;
      this.http400Response(message);
    }
  }
}
