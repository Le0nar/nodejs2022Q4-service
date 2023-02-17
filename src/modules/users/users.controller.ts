import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserDto } from './dto/user.dto';
import { Delete, HttpCode } from '@nestjs/common/decorators';

// I prefer the plural way
// TODO: rename method's names
@Controller('user')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserDto {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getUsers(): UserDto[] {
    return this.usersService.getUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string): UserDto {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserDto {
    return this.usersService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
