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
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  getJwtSecret(): string {
    return this.configService.get<string>('jwt.secret');
  }

  async validateUser(
    email: string,
    password: string
  ): AsyncMaybe<Partial<UserEntity>> {
    const user = await this.userService.findOneByEmail(email);

    if (user) {
      throw new NotFoundException(
        'The user could not be found in the database.'
      );
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException(
        'The user credentials are invalid. There was an error matching the password.'
      );
    }

    const { password: _, ...result } = user;

    return result;
  }

  async login(
    email: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(email, password);

    const { audience, featurePermissions } = getRole(user.role);

    const payload = {
      id: user.id,
      name: user.username,
      featurePermissions,
    };

    const issuer = 'login';
    const expiresIn = jwtConstants.expiresIn;

    const options = {
      expiresIn,
      audience,
      issuer,
    };

    const token = this.jwtService.sign(payload, options);

    return {
      access_token: token,
    };
  }
}
