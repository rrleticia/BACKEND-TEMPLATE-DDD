import { Roles } from '@common/roles/roles';
import { Role } from '@common/enums';
import { RoleType } from '@common/types';

export function getRole(role: Role): RoleType | undefined {
  if (role == Role.ADMIN) {
    return Roles.ADMIN;
  } else if (role == Role.USER) {
    return Roles.USER;
  } else {
    return undefined;
  }
}
