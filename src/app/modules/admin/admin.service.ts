import { Role } from '@common/enums';
import { UserEntity } from '@entities/user.entity';
import { UsersRepository } from '@infra/database/connection/user.repository';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private _configService: ConfigService
  ) {}

  private getAdminPassword(): string {
    return this._configService.get<string>('jwt.secret');
  }

  async create(email: string, admin_password: string): Promise<UserEntity> {
    const user = await this._usersRepository.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('Unable to retrieve user based on email');
    }

    const correct_password = this.getAdminPassword();

    const isMatch = bcrypt.compare(admin_password, correct_password);

    if (!isMatch) {
      throw new ForbiddenException('The password was not authorized');
    }

    const admin = await this._usersRepository.update(user.id, {
      role: Role.ADMIN,
    });

    return admin;
  }
}
