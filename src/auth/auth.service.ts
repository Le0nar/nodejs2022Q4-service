import { Injectable } from '@nestjs/common';
import { ForbiddenException } from '@nestjs/common/exceptions/forbidden.exception';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  signUp({ login, password }: AuthDto) {
    const date = new Date().getTime();

    const user: User = {
      login,
      // TODO: hash password here
      // password.hash(procces.env.SECRET_KEY),
      password,
      id: uuidv4(),
      createdAt: date,
      updatedAt: date,
      version: 1,
    };

    this.usersRepository.save(user);

    return {
      id: user.id,
      login: user.login,
      createAt: user.createdAt,
      updatedAt: user.updatedAt,
      version: user.version,
    };
  }

  async login({ login, password }: AuthDto) {
    const user = await this.usersRepository.findOneBy({ login });

    if (password !== user.password) {
      throw new ForbiddenException(
        `No user with such login, password doesn't match actual one`,
      );
    }
    const { createdAt, id, updatedAt, version } = user;

    const payload = { createdAt, id, login, updatedAt, version, password };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
