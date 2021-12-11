import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { IsAvailableRole } from '../../validator/role/is-available-role.decorator';
import { RolesValueObject } from '../../../../../../infrastructure/security/value-object/roles.value-object';

export class BindUserToSpaceDto {
  @IsArray()
  @IsNotEmpty()
  @IsAvailableRole(RolesValueObject.availableUserRoles)
  permissions: string[];
}
