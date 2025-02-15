import { UsersRepository } from '@infra/database/connection/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserEntity } from '@entities/user.entity';
import { AsyncMaybe } from '@core/logic/Maybe';
import { PageOptionsDto } from '@core/pagination/dto/page-options.dto';
import { PageDto } from '@core/pagination/dto/page.dto';
import { PageMetaDto } from '@core/pagination/dto';
import { ConfigService } from '@nestjs/config';
import { PwnedService } from '@modules/pwned/pwned.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private _configService: ConfigService,
    private _pwnedService: PwnedService
  ) {}

  private getSaltRounds(): string {
    return this._configService.get<string>('bycrypt.bycryptConstants;');
  }

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
      await this._evalutePassword(data);
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

  private async _evalutePassword(user: CreateUserDTO): Promise<void> {
    if (user.evalutePassword) {
      const password = user.password;

      if (!password) {
        throw new BadRequestException(
          'Invalid input for password field of User.'
        );
      }

      const invalid = await this._pwnedService.hasLeaked(password);

      if (invalid) {
        throw new BadRequestException(
          'The password has been leaked. Consider using another password.'
        );
      }
    }
  }

  private async _hashPassword(user: CreateUserDTO): Promise<CreateUserDTO> {
    const password = user.password;

    if (!password) {
      throw new BadRequestException(
        'Invalid input for password field of User.'
      );
    }

    const saltRounds = this.getSaltRounds();

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;

    return user;
  }
}
