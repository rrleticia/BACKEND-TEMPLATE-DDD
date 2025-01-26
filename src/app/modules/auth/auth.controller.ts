import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@common/guards';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { Request as ExpRequest, Response as ExpResponse } from 'express';
import { ExpireDate } from '@common/util';
import { jwtConstants } from '@common/constants';
import { UserService } from '@modules/user/user.service';
import { Metadata, SkipAuth } from '@common/decorators';
import { UserEntity } from '@entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Metadata() metadata): Promise<UserEntity> {
    const user = await this._userService.findOneById(metadata.id);
    return new UserEntity(user, user.id);
  }

  @SkipAuth()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: ExpRequest,
    @Res({ passthrough: true }) response: ExpResponse
  ): Promise<void> {
    console.log(request);
    const { access_token } = await this._authService.login(request.user);
    response
      .cookie('access_token', access_token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: ExpireDate(jwtConstants.expiresInNum),
      })
      .status(200)
      .send({ status: 'logged in' });
  }

  @UseGuards(JwtAuthGuard)
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
      .send({ status: 'logged out' });
  }
}
