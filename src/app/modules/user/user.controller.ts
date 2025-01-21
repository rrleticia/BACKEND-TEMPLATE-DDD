import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { PageDto, PageOptionsDto } from '@src/core/pagination';
import { UserEntity } from '@src/entities';
import { AsyncMaybe } from '@core/logic';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('')
  @HttpCode(200)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserEntity>> {
    return await this._userService.getAll(pageOptionsDto);
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(@Param('id') id: string): AsyncMaybe<UserEntity> {
    return await this._userService.getOneById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
    return await this._userService.create(createUserDto);
  }

  @Put()
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO
  ): Promise<UserEntity> {
    return await this._userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): AsyncMaybe<UserEntity> {
    return await this._userService.delete(id);
  }
}
