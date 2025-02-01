import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { AsyncMaybe } from '@core/logic';
import { UserEntity } from '@entities/user.entity';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '@common/constants';
import { getRole } from '@common/util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private _userService: UserService,
    private _jwtService: JwtService,
    private _configService: ConfigService
  ) {}

  getJwtSecret(): string {
    return this._configService.get<string>('jwt.secret');
  }

  async validateUser(
    email: string,
    password: string
  ): AsyncMaybe<Partial<UserEntity>> {
    const user = await this._userService.findOneByEmail(email);

    if (!user) {
      return undefined;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return undefined;
    }

    delete user.props.password;

    return user;
  }

  async login(user: Partial<UserEntity>): Promise<{ access_token: string }> {
    const roleData = getRole(user.role);

    const { audience, featurePermissions } = roleData;

    const payload = {
      sub: user.id,
      username: user.username,
      featurePermissions,
    };

    const issuer = 'login';
    const expiresIn = jwtConstants.expiresIn;
    const secret = this.getJwtSecret();

    const options = {
      expiresIn,
      audience,
      issuer,
      secret,
    };

    const token = this._jwtService.sign(payload, options);

    return {
      access_token: token,
    };
  }
}
