import { EncrypterInterface } from './encrypter.interface';

const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

export class EncrypterMock implements EncrypterInterface {
  public async compare(plainPassword: string, hashedPassword: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public async hash(plainPassword: string, salt: string): Promise<string> {
    return Promise.resolve(genRanHex(32));
  }

  public async salt(): Promise<string> {
    return Promise.resolve(genRanHex(32));
  }
}
