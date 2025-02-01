import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UserEntity } from '@entities/user.entity';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly _adminService: AdminService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() createAdminDto: CreateAdminDto): Promise<UserEntity> {
    const { email, admin_password } = createAdminDto;
    const user = await this._adminService.create(email, admin_password);
    return new UserEntity(user, user.id);
  }
}
