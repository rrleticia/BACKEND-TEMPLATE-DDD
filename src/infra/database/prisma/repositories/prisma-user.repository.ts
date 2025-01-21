import { Injectable } from '@nestjs/common';
import { AsyncMaybe } from '@src/core';
import { User } from '@src/entities';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '../prisma.service';
import { UsersRepository } from '@src/infra/database/connection/user.repository';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    const rawUsers = await this.prisma.user.findMany({});

    const users = rawUsers.map((user) => {
      return UserMapper.toDomain(user);
    });

    return users;
  }

  async findOneById(id: string): AsyncMaybe<User> {
    const rawUser = await this.prisma.user.findUnique({ where: { id: id } });

    if (!rawUser) {
      return undefined;
    }

    return UserMapper.toDomain(rawUser);
  }

  async create(user: User): Promise<User> {
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return user;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const rawUser = await this.prisma.user.update({
      where: { id: id },
      data: user,
    });

    return UserMapper.toDomain(rawUser);
  }

  async delete(id: string): AsyncMaybe<User> {
    const rawUser = await this.prisma.user.delete({ where: { id: id } });

    if (!rawUser) {
      return undefined;
    }

    return UserMapper.toDomain(rawUser);
  }
}
