import { Prisma, User as RawUser } from '@prisma/client';
import { UserEntity } from '@src/entities';

export class UserMapper {
  static toDomain(raw: RawUser): UserEntity {
    const user = UserEntity.create({
      email: raw.email,
      username: raw.username,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    return user;
  }

  static toPersistence(user: UserEntity): Prisma.UserCreateInput {
    return {
      email: user.email,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
