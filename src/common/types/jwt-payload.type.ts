import { Role } from '@common/enums';

export type JwtPayloadType = {
  id: string;
  email: string;
  issuer: string;
  roles: Role[];
};
