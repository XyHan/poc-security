import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsAvailableRole } from '../../validator/role/is-available-role.decorator';
import { RolesValueObject } from '../../../../../../infrastructure/security/value-object/roles.value-object';

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

  @IsArray()
  @IsNotEmpty()
  @IsAvailableRole(RolesValueObject.availableUserRoles)
  roles: string[];
}
