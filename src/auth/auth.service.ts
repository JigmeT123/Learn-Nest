import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { CreateAuthCredentialsDto } from './auth-crediantials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) 
    private readonly userRepo: UserRepository,
  ) {}

  async signUp(authValidateDto: CreateAuthCredentialsDto):Promise<void>{
      return this.userRepo.signUp(authValidateDto);
  }

  
}
