import { Role } from '@common/enums';
import { Prisma, User as RawUser } from '@prisma/client';
import { UserEntity } from '@src/entities';

export class UserMapper {
  static toDomain(raw: RawUser): UserEntity {
    const user = UserEntity.create(
      {
        email: raw.email,
        password: raw.password,
        username: raw.username,
        name: raw.name,
        role: raw.role as Role,
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
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
