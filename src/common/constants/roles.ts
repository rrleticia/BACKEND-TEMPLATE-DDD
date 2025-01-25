export const Roles = {
  ADMIN: {
    audience: ['/api/user/*'],
    featurePermissions: ['GET_ALL_USERS', 'SHOW_LOGGED_USER'],
  },
  USER: { audience: ['/api/user/*'], featurePermissions: ['SHOW_LOGGED_USER'] },
};
