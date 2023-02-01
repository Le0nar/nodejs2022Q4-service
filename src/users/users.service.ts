import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  createUser(createUserdto: CreateUserDto): User {
    // TODO:fix adding fields for user, do some actions with password
    const user: User = {
      ...createUserdto,
      id: '111',
      createdAt: 123,
      updatedAt: 123,
      version: 1,
    };

    this.users.push(user);

    return user;
  }

  getUsers(): User[] {
    return this.users;
  }

  getUser(id: string): User {
    return this.users.find((user) => user.id === id);
  }
}
