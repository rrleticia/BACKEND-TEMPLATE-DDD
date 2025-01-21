import { Controller, Delete, Get, HttpCode, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  @HttpCode(200)
  async getUser(): Promise<> {}

  @Post()
  @HttpCode(201)
  async create(): Promise<> {}

  @Put()
  @HttpCode(200)
  async update(): Promise<> {}

  @Delete(':id')
  @HttpCode(200)
  async delete(): Promise<> {}
}
