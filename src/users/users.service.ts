import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';
import { v4 as uuidv4, validate as validateUUID } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  // TODO: mb after adding DB write users to this array
  private readonly users: User[] = [];

  // TODO: mb move to utils
  private getUserDto(user: User): UserDto {
    const { createdAt, id, login, updatedAt, version } = user;
    return { createdAt, id, login, updatedAt, version };
  }

  createUser(createUserDto: CreateUserDto): UserDto {
    // TODO: mb move validate 'createUserdto' to utils
    const isLoginString = typeof createUserDto.login === 'string';
    const isPasswordString = typeof createUserDto.password === 'string';
    const isCreateUserDtoValid = isLoginString && isPasswordString;

    if (!isCreateUserDtoValid) {
      throw new BadRequestException(
        'Body does not contain required fields or fields are of the wrong type',
      );
    }

    const date = new Date().getTime();

    // TODO:move to utils
    const user: User = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: date,
      updatedAt: date,
      version: 1,
    };

    this.users.push(user);

    return this.getUserDto(user);
  }

  getUsers(): UserDto[] {
    const userDtoList = this.users.map((user) => this.getUserDto(user));
    return userDtoList;
  }

  getUser(id: string): UserDto {
    const isIdValid = validateUUID(id);

    if (!isIdValid) {
      throw new BadRequestException('User id is invalid (not uuid)');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    return this.getUserDto(user);
  }

  updatePassword(id: string, updatePasswordDto: UpdatePasswordDto): UserDto {
    // TODO: use fragment for dont repeat this block in deleteUser method
    const isIdValid = validateUUID(id);

    if (!isIdValid) {
      throw new BadRequestException('User id is invalid (not uuid)');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    const isPasswordCorrect = user.password === updatePasswordDto.oldPassword;

    if (!isPasswordCorrect) {
      throw new NotFoundException('Old password is wrong');
    }

    const updatedUser: User = {
      ...user,
      password: updatePasswordDto.newPassword,
    };

    this.users[userIndex] = updatedUser;

    return this.getUserDto(user);
  }

  deleteUser(id: string) {
    const isIdValid = validateUUID(id);

    if (!isIdValid) {
      throw new BadRequestException('User id is invalid (not uuid)');
    }

    const userIndex = this.users.findIndex((user) => user.id === id);
    const user = this.users[userIndex];

    if (!user) {
      throw new NotFoundException("User doesn't exist");
    }

    this.users.splice(userIndex, 1);
  }
}
