import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@infra/database/database.module';
import { AuthModule } from '@modules/auth/auth.module';
import { PwnedModule } from '@modules/pwned/pwned.module';

@Module({
  imports: [DatabaseModule, PwnedModule, forwardRef(() => AuthModule)],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
