import { IsArray, IsDefined, IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { IsAvailableRole } from '../validator/role/is-available-role.decorator';
import { RolesValueObject } from '../../../../../infrastructure/security/value-object/roles.value-object';

export class UpdateAUserDto {
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  status: number;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsEmail()
  email: string;

  @IsArray()
  @IsNotEmpty()
  @IsAvailableRole(RolesValueObject.availableUserRoles)
  roles: string[];
}
