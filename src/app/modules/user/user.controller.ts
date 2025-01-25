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
import {
  CreateUserResponse,
  CreateUserSummary,
  DeleteUserResponse,
  DeleteUserSummary,
  GetAllUsersResponse,
  GetAllUsersSummary,
  GetOneUserByIdResponse,
  GetOneUserByIdSummary,
  UpdateUserResponse,
  UpdateUserSummary,
} from './swagger/user-response.decorator';
import { instanceToPlain } from 'class-transformer';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('')
  @HttpCode(200)
  @GetAllUsersSummary()
  @GetAllUsersResponse()
  async getAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<UserEntity>> {
    const { data, meta } = await this._userService.findAll(pageOptionsDto);
    const transformedData = data.map((user) =>
      instanceToPlain(user)
    ) as UserEntity[];
    return new PageSerialDto(transformedData, meta);
  }

  @Get(':id')
  @HttpCode(200)
  @GetOneUserByIdSummary()
  @GetOneUserByIdResponse()
  async getOneById(@Param('id') id: string): AsyncMaybe<UserEntity> {
    const user = await this._userService.findOneById(id);
    return new UserEntity(user, user.id);
  }

  @Post()
  @HttpCode(201)
  @CreateUserSummary()
  @CreateUserResponse()
  async create(@Body() createUserDto: CreateUserDTO): Promise<UserEntity> {
    const user = await this._userService.create(createUserDto);
    return new UserEntity(user, user.id);
  }

  @Put(':id')
  @HttpCode(200)
  @UpdateUserSummary()
  @UpdateUserResponse()
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO
  ): Promise<UserEntity> {
    const user = await this._userService.update(id, updateUserDto);
    return new UserEntity(user, user.id);
  }

  @Delete(':id')
  @HttpCode(200)
  @DeleteUserSummary()
  @DeleteUserResponse()
  async delete(@Param('id') id: string): AsyncMaybe<UserEntity> {
    const user = await this._userService.delete(id);
    return new UserEntity(user, user.id);
  }
}
