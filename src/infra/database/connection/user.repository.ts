import { Injectable } from '@nestjs/common';
import { AsyncMaybe } from '@src/core';
import { User } from '@src/entities';

@Injectable()
export abstract class UsersRepository {
  abstract findAll(): Promise<User[]>;
  abstract findOneById(id: string): AsyncMaybe<User>;
  abstract create(user: User): Promise<User>;
  abstract update(id: string, user: Partial<User>): Promise<User>;
  abstract delete(id: string): AsyncMaybe<User>;
}
