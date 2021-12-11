import { AuthManagerInterface } from './auth-manager.interface';
import { UserInterface } from '../../model/user/user.model';
import { TokenInterface, TokenModel } from '../../model/auth/token.model';
import { UserFixtures } from '../../fixtures/user.fixtures';

export class AuthManagerMock implements AuthManagerInterface {
  private readonly _refEmail: string;
  private readonly _refPassword: string;
  private _tokenCollection: string[];
  private _currentTokenNumber: number | undefined;

  constructor(refEmail: string, refPassword) {
    this._refEmail = refEmail;
    this._refPassword = refPassword;
    this.tokenCollection = [
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.C8yboJRqQNelrZiI7R_J5AgUFLbWqlzOTAfoqAKUR5A',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.jjGXOHtAKvoUV4OsVak2HaNivLEWowUiVTPzvMLAaKA',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkR1bmNhbiBNYWNMZW9kIiwiaWF0IjoxNTE2MjM5MDIyfQ.CD0X6xazkkRGVYK1HyNFCkjgymO5l2cBnzsJzRh2nl4',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkNvbm9yIE1hY0xlb2QiLCJpYXQiOjE1MTYyMzkwMjJ9.Pxr-H1VDWVHQ9MNk0zOUDiwILx99efuxeFjwCVePy3g'
    ];
  }

  private getTokenNumber(): number {
    const tokenNumber: number = Math.floor(Math.random() * Math.floor(4));
    if (this.currentTokenNumber && this.currentTokenNumber === tokenNumber) return this.getTokenNumber();
    return tokenNumber;
  }

  public generateToken(user: UserInterface): TokenInterface {
    return new TokenModel(this.tokenCollection[this.getTokenNumber()]);
  }

  public isValidPassword(passwordToCompare: string, passwordToCompareWith: string): Promise<boolean> {
    return passwordToCompare === passwordToCompareWith ? Promise.resolve(true) : Promise.resolve(false);
  }

  public async isValidUser(token: TokenInterface): Promise<UserInterface | undefined> {
    const isValidToken: boolean = this.tokenCollection.some((tokenAsString: string) => tokenAsString === token.toString());
    if (isValidToken) return Promise.resolve(UserFixtures.userCollection[0]);
  }

  set tokenCollection(tokenCollection: string[]) {
    this._tokenCollection = tokenCollection;
  }

  get tokenCollection(): string[] {
    return this._tokenCollection;
  }

  get currentTokenNumber(): number | undefined {
    return this._currentTokenNumber;
  }

  set currentTokenNumber(value: number | undefined) {
    this._currentTokenNumber = value;
  }
}
