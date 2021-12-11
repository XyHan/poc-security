// Todo user real roles
export const roleSuperAdmin = 0;
export const roleAdmin = 1;
export const roleUser = 2;

export interface RoleInterface {
  label: string;
}

export class RoleModel implements RoleInterface {
  private _label: string;

  get label(): string {
    return this._label;
  }

  set label(value: string) {
    this._label = value;
  }
}
