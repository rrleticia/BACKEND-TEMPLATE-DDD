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
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AsyncMaybe } from '@core/logic';
import { PageOptionsDto, PageDto, PageSerialDto } from '@core/pagination';
import { UserEntity } from '@entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('')
  @HttpCode(200)
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserEntity>> {
    const { data, meta } = await this._userService.getAll(pageOptionsDto);
    return new PageSerialDto(data, meta, UserEntity);
  }

  @Get(':id')
  @HttpCode(200)
  async getOneById(@Param('id') id: string): AsyncMaybe<UserEntity> {
    const user = await this._userService.getOneById(id);
    return new UserEntity(user);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
    const user = await this._userService.create(createUserDto);
    return new UserEntity(user);
  }

  @Put()
  @HttpCode(200)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO
  ): Promise<UserEntity> {
    const user = await this._userService.update(id, updateUserDto);
    return new UserEntity(user);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id') id: string): AsyncMaybe<UserEntity> {
    const user = await this._userService.delete(id);
    return new UserEntity(user);
  }
}
