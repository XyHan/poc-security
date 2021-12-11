import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAUserDto {
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
