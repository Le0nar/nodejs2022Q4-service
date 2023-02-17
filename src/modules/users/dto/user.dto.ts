import { User } from '../interfaces/user.interface';

export class UserDto implements Omit<User, 'password'> {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
