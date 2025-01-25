import { Injectable } from '@nestjs/common';
import { AsyncMaybe } from '@src/core';
import { UserEntity } from '@src/entities';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaService } from '../prisma.service';
import { UsersRepository } from '@src/infra/database/connection/user.repository';
import { PaginationOrder } from '@common/enums/pagination-order.enum';
import { FindAllType } from '@common/types/find-all.type';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(
    order: PaginationOrder,
    skip: number,
    limit: number
  ): Promise<FindAllType> {
    const rawUsers = await this.prisma.user.findMany({
      orderBy: {
        createdAt: order,
      },
      skip,
      take: limit,
    });

    const itemCount = await this.prisma.user.count({});

    const entities = rawUsers.map((user) => {
      return UserMapper.toDomain(user);
    });

    return { entities, itemCount };
  }

  async findOneByEmail(email: string): AsyncMaybe<UserEntity> {
    const rawUser = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!rawUser) {
      return undefined;
    }

    return UserMapper.toDomain(rawUser);
  }

  async findOneById(id: string): AsyncMaybe<UserEntity> {
    const rawUser = await this.prisma.user.findUnique({ where: { id: id } });

    if (!rawUser) {
      return undefined;
    }

    return UserMapper.toDomain(rawUser);
  }

  async create(user: UserEntity): Promise<UserEntity> {
    await this.prisma.user.create({
      data: UserMapper.toPersistence(user),
    });

    return user;
  }

  async update(id: string, user: Partial<UserEntity>): Promise<UserEntity> {
    const rawUser = await this.prisma.user.update({
      where: { id: id },
      data: user,
    });

    return UserMapper.toDomain(rawUser);
  }

  async delete(id: string): AsyncMaybe<UserEntity> {
    const rawUser = await this.prisma.user.delete({ where: { id: id } });

    if (!rawUser) {
      return undefined;
    }

    return UserMapper.toDomain(rawUser);
  }
}
