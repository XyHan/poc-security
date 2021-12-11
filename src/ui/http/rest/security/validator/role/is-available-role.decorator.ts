import { registerDecorator, ValidationOptions } from 'class-validator';
import { IsAvailableRoleConstraint } from './is-available-role.constraint';

export function IsAvailableRole(availableRoles: string[], validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: availableRoles,
      validator: IsAvailableRoleConstraint,
    });
  };
}
