import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('users')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  findAll(@Query('filter') filter?: string) {
    return this.usersService.findAll(filter);
  }

  @Get('users/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('users/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete('users/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
