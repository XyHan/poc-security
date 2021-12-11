import { Inject, Injectable } from '@nestjs/common';
import { BcryptAdapter } from '../../adapter/bcrypt.adapter';
import { EncrypterInterface } from '../../../../domain/utils/encrypter/encrypter.interface';
import { AuthServiceException } from './auth.service.exception';
import { AuthManagerInterface } from '../../../../domain/utils/security/auth-manager.interface';
import { JsonWebTokenAdapter } from '../../adapter/jwt/json-web-token.adapter';
import { TokenInterface, TokenModel } from '../../../../domain/model/auth/token.model';
import { UserInterface} from '../../../../domain/model/user/user.model';
import { IQueryBus, QueryBus } from "@nestjs/cqrs/dist";
import { DecodedTokenInterface } from '../../../../domain/model/auth/decoded-token.model';
import { plainToClass } from "class-transformer";
import { GetOneUserByUuidQuery } from '../../../../application/query/user/get-one-user-by-uuid/get-one-user-by-uuid.query';
import { DecodedTokenTransformer } from '../../transformer/decodedToken.transformer';

@Injectable()
export class AuthService implements AuthManagerInterface {
  private readonly _encrypter: EncrypterInterface;
  private readonly _jwtAdapter: JsonWebTokenAdapter;
  private readonly _queryBus: IQueryBus;

  constructor(
    @Inject(BcryptAdapter) encrypter: EncrypterInterface,
    @Inject(JsonWebTokenAdapter) jwtAdapter: JsonWebTokenAdapter,
    @Inject(QueryBus) queryBus: IQueryBus
  ) {
    this._encrypter = encrypter;
    this._jwtAdapter = jwtAdapter;
    this._queryBus = queryBus;
  }

  public async isValidPassword(passwordToCompare: string, passwordToCompareWith: string): Promise<boolean> {
    try {
      return await this._encrypter.compare(passwordToCompare, passwordToCompareWith);
    } catch (e) {
      throw new AuthServiceException(`AuthService - validate - Password validation error: ${e.message}`);
    }
  }

  public generateToken(user: UserInterface): TokenInterface {
    try {
      const token: string = this._jwtAdapter.sign(user);
      return new TokenModel(token);
    } catch (e) {
      throw new AuthServiceException(`AuthService - generateToken - Token generation for user ${user.email} error: ${e.message}`);
    }
  }

  public async isValidUser(token: TokenInterface): Promise<UserInterface | undefined> {
    try {
      const verifiedToken: string | object = this._jwtAdapter.verify(token);
      const decodedToken: DecodedTokenInterface = plainToClass(DecodedTokenTransformer, verifiedToken);
      if (decodedToken && decodedToken.uuid) {
        const query = new GetOneUserByUuidQuery(decodedToken.uuid, []);
        const user: UserInterface | null = await this._queryBus.execute(query);
        if (user) return user;
      }
    } catch (e) {
      throw new AuthServiceException(`AuthService - isGrantedUser - Error: ${e.message}`);
    }
  }
}
