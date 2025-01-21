import { AsyncMaybe } from '@core/logic';
import { PageDto, PageMetaDto, PageOptionsDto } from '@core/pagination';
import { UsersRepository } from '@infra/database/connection/user.repository';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@src/entities';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async getAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
    try {
      const { order, skip, limit } = pageOptionsDto;

      const { entities, itemCount } = await this._usersRepository.findAll(
        order,
        skip,
        limit
      );

      const pageMetaDto = new PageMetaDto({
        pageOptionsDto: pageOptionsDto,
        itemCount,
      });

      return new PageDto(entities, pageMetaDto);
    } catch (e) {
      throw e;
    }
  }

  async getOneById(id: string): AsyncMaybe<UserEntity> {
    try {
      return await this._usersRepository.findOneById(id);
    } catch (e) {
      throw e;
    }
  }
  async create(data: CreateUserDTO): Promise<UserEntity> {
    try {
      return await this._usersRepository.create(data);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, data: UpdateUserDTO): Promise<UserEntity> {
    try {
      return await this._usersRepository.update(id, data);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): AsyncMaybe<UserEntity> {
    try {
      return await this._usersRepository.delete(id);
    } catch (e) {
      throw e;
    }
  }
}
