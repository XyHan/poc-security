export interface EncrypterInterface {
  salt(): Promise<string>;
  hash(plainPassword: string, salt: string): Promise<string>;
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
