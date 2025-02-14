import { Module } from '@nestjs/common';
import { UsersRepository } from './connection/user.repository';
import { PrismaService } from './prisma/prisma.service';
import { USER_PROVIDER } from './providers/database.providers';

@Module({
  providers: [PrismaService, USER_PROVIDER],
  exports: [PrismaService, UsersRepository],
})
export class DatabaseModule {}
