import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './user.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Get(':id')
  findUserById(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Get()
  findAllUsers() {
    return this.userService.findAll()
  }

  @Post()
  create( @Body() body: CreateUserDto) {
    return this.userService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
