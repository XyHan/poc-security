import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
