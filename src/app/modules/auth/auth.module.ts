import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigAsync } from '@common/config';

@Module({
  imports: [JwtModule.registerAsync(JwtConfigAsync)],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

