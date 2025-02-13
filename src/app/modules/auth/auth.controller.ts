import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@common/guards';
import { Request as ExpRequest, Response as ExpResponse } from 'express';
import { ExpireDate } from '@common/util';
import { jwtConstants } from '@common/constants';
import { UserService } from '@modules/user/user.service';
import { UserEntity } from '@entities/user.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { Roles } from '@common/roles';
import { Role } from '@common/enums';
import { JwtPayload, SkipAuth } from '@common/decorators';
import { JwtPayloadType } from '@common/types/jwt-payload.type';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  @Roles(Role.ADMIN, Role.USER)
  @Get('profile')
  async getProfile(
    @JwtPayload() jwtPayload: JwtPayloadType
  ): Promise<UserEntity> {
    const user = await this._userService.findOneById(jwtPayload.id);
    return new UserEntity(user, user.id);
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: AuthLoginDTO })
  @Post('login')
  async login(
    @Req() request: ExpRequest,
    @Res({ passthrough: true }) response: ExpResponse
  ): Promise<void> {
    const { access_token } = await this._authService.login(request.user);
    response
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false, // Change to true in production
        sameSite: 'lax',
        expires: ExpireDate(jwtConstants.expiresInNum),
      })
      .status(200)
      .send({
        code: 200,
        status: 'User successfully logged in.',
        timestamp: new Date().toISOString(),
      });
  }

  @Post('logout')
  async logout(
    @Res({ passthrough: true }) response: ExpResponse
  ): Promise<void> {
    response
      .clearCookie('access_token', {
        httpOnly: true,
        secure: false, // Change to true in production
        sameSite: 'lax',
      })
      .status(200)
      .send({
        code: 200,
        status: 'User successfully logged out.',
        timestamp: new Date().toISOString(),
      });
  }
}
