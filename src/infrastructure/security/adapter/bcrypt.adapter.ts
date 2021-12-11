import { Inject, Injectable } from '@nestjs/common';
import { EncrypterInterface } from '../../../domain/utils/encrypter/encrypter.interface';

@Injectable()
export class BcryptAdapter implements EncrypterInterface {
  private readonly _bcrypt;

  constructor(@Inject('BCRYPT') bcrypt) {
    this._bcrypt = bcrypt;
  }

  public async compare(plainPassword: string, hashedPassword: string): Promise<boolean>  {
    return await this._bcrypt.compare(plainPassword, hashedPassword);
  }

  public async hash(plainPassword: string, salt: string): Promise<string>  {
    return await this._bcrypt.hash(plainPassword, salt);
  }

  public async salt(): Promise<string> {
    return await this._bcrypt.genSalt(10);
  }
}
