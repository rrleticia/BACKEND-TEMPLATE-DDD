import { Prisma, User as RawUser } from '@prisma/client';
import { User } from '@src/entities';

export class UserMapper {
  static toDomain(raw: RawUser): User {
    const user = User.create({
      email: raw.email,
      username: raw.username,
      name: raw.name,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });

    return user;
  }

  static toPersistence(user: User): Prisma.UserCreateInput {
    return {
      email: user.email,
      username: user.username,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
