import { UsersRepository } from '@infra/database/connection/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from '@entities/user.entity';
import { AsyncMaybe } from '@core/logic/Maybe';
import { PageOptionsDto } from '@core/pagination/dto/page-options.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { PageMetaDto } from '@core/pagination/dto';
import bcrypt from 'bcrypt';
import { bycryptConstants } from '@common/constants';

@Injectable()
export class UserService {
  constructor(private readonly _usersRepository: UsersRepository) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<UserEntity>> {
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

  async findOneByEmail(email: string): AsyncMaybe<UserEntity> {
    try {
      return await this._usersRepository.findOneByEmail(email);
    } catch (e) {
      throw e;
    }
  }

  async findOneById(id: string): AsyncMaybe<UserEntity> {
    try {
      return await this._usersRepository.findOneById(id);
    } catch (e) {
      throw e;
    }
  }

  async create(data: CreateUserDTO): Promise<UserEntity> {
    try {
      const processedData = await this._hashPassword(data);
      return await this._usersRepository.create(processedData);
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

  private async _hashPassword(user: CreateUserDTO): Promise<CreateUserDTO> {
    const password = user.password;
    if (!password) {
      throw new BadRequestException(
        'Invalid input for password field of User.'
      );
    }

    const hashedPassword = await bcrypt.hash(
      password,
      bycryptConstants.saltRounds
    );

    user.password = hashedPassword;

    return user;
  }
}
