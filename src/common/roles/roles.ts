export const Roles = {
  ADMIN: {
    audience: ['/api/admin/', '/api/user/', '/api/auth/'],
    featurePermissions: ['GET_ALL_USERS', 'SHOW_LOGGED_USER'],
  },
  USER: {
    audience: ['/api/user/', '/api/auth/'],
    featurePermissions: ['SHOW_LOGGED_USER'],
  },
};
