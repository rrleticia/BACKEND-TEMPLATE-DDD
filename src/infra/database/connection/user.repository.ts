import { Injectable } from '@nestjs/common';
import { AsyncMaybe } from '@src/core';
import { UserEntity } from '@src/entities';
import { BaseRepository } from './base.repository';

@Injectable()
export abstract class UsersRepository extends BaseRepository<UserEntity> {
  abstract findOneByEmail(email: string): AsyncMaybe<UserEntity>;
}
