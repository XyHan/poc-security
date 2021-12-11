export class RolesValueObject {
  public static availableUserRoles: string[] = [
    'SUPER_ADMIN',
    'ADMIN',
    'USER'
  ]

  public static isValidRole(role: string): boolean {
    return this.availableUserRoles.some((availableRole: string) => availableRole === role);
  }
}
