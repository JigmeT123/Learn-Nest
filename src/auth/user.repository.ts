import { Repository, EntityRepository } from 'typeorm';
import { User } from './user.entity';
import { CreateAuthCredentialsDto } from './auth-crediantials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialDto: CreateAuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `The user name: ${user.username} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
