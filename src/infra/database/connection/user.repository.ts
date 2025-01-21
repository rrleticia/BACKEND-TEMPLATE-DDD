import { Injectable } from '@nestjs/common';
import { AsyncMaybe } from '@src/core';
import { UserEntity } from '@src/entities';
import { FindAllType } from '@common/types/find-all.type';

@Injectable()
export abstract class UsersRepository {
  abstract findAll(
    order: string,
    skip: number,
    limit: number
  ): Promise<FindAllType>;
  abstract findOneById(id: string): AsyncMaybe<UserEntity>;
  abstract create(user: Partial<UserEntity>): Promise<UserEntity>;
  abstract update(id: string, user: Partial<UserEntity>): Promise<UserEntity>;
  abstract delete(id: string): AsyncMaybe<UserEntity>;
}
