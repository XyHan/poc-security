import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsAvailableRoleConstraint implements ValidatorConstraintInterface {
  validate(roles: string[], args: ValidationArguments) {
    if (!roles || !roles.length) return false;
    return roles
      .map((role: string) => args.constraints.some((availableRole: string) => role === availableRole))
      .every((value: boolean) => value)
    ;
  }

  defaultMessage(args?: ValidationArguments): string {
    return `Available roles are ${args.constraints.join(', ')}`
  }
}
