import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '@common/guards';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { Response as ExpResponse } from 'express';
import { ExpireDate } from '@common/util';
import { jwtConstants } from '@common/constants';
import { AuthLoginDTO } from './dto/auth-login-dto';
import { UserService } from '@modules/user/user.service';
import { Metadata } from '@common/decorators';
import { UserEntity } from '@entities/user.entity';

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

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() authLoginDTO: AuthLoginDTO,
    @Res({ passthrough: true }) res: ExpResponse
  ): Promise<void> {
    const { email, password } = authLoginDTO;
    const { access_token } = await this._authService.login(email, password);
    res
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
  async logout(@Res({ passthrough: true }) res: ExpResponse): Promise<void> {
    res
      .clearCookie('access_token', {
        httpOnly: true,
        secure: false, // Change to true in production
        sameSite: 'lax',
      })
      .status(200)
      .send({ status: 'logged out' });
  }
}
