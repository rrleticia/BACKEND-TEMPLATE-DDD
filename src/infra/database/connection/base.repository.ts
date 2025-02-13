import { Injectable } from '@nestjs/common';
import { AsyncMaybe } from '@src/core';
import { FindAllType } from '@common/types/find-all.type';

@Injectable()
export abstract class BaseRepository<T> {
  abstract findAll(
    order: string,
    skip: number,
    limit: number
  ): Promise<FindAllType>;
  abstract findOneById(id: string): AsyncMaybe<T>;
  abstract create(user: Partial<T>): Promise<T>;
  abstract update(id: string, user: Partial<T>): Promise<T>;
  abstract delete(id: string): AsyncMaybe<T>;
}
