import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from './dto/user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
// TODO: rename to User
import { User } from './entities/user.entity';
import { checkEntity } from 'src/helpers/check-entity.helper';
import { NotFoundException } from '@nestjs/common/exceptions';

// TODO: hide password from users
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const date = new Date().getTime();

    const user: User = {
      ...createUserDto,
      id: uuidv4(),
      createdAt: date,
      updatedAt: date,
      version: 1,
    };

    this.usersRepository.save(user);
    return user;
  }

  async updatePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id });

    checkEntity(user, 'User', id);

    const isPasswordCorrect = user.password === updatePasswordDto.oldPassword;
    if (!isPasswordCorrect) {
      throw new NotFoundException('Old password is wrong');
    }

    user.password = updatePasswordDto.newPassword;

    this.usersRepository.save(user);

    return user;
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
