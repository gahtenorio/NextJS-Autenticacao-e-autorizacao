type User = {
  permissions: string[];
  roles: string[];
};

type ValidateUserPermissionsParams = {
  user: User;
  permissions?: string[];
  roles?: string[];
};

export function validateUserPermissions({
  user,
  permissions,
  roles,
}: ValidateUserPermissionsParams) {
  if (permissions?.length > 0) {
    const hansAllPermissions = permissions.every((permission) => {
      return user.permissions.includes(permission);
    });

    if (!hansAllPermissions) {
      return false;
    }
  }

  if (roles?.length > 0) {
    const hansAllRoles = roles.some((role) => {
      return user.roles.includes(role);
    });

    if (!hansAllRoles) {
      return false;
    }
  }

  return true;
}
