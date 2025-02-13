import { Role } from '@common/enums';
import { Prisma, User as RawUser, Role as RawRole } from '@prisma/client';
import { UserEntity } from '@src/entities';

export class UserMapper {
  static toDomain(raw: RawUser): UserEntity {
    const user = UserEntity.create(
      {
        email: raw.email,
        password: raw.password,
        username: raw.username,
        name: raw.name,
        roles: raw.roles as Role[],
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      raw.id
    );
    return user;
  }

  static toPersistence(user: UserEntity): Prisma.UserCreateInput {
    return {
      email: user.email,
      password: user.password,
      username: user.username,
      name: user.name,
      roles: user.roles as RawRole[],
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
