import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthCredentialsDto } from './auth-crediantials.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService){}

    @Post('/signup')
    signup(@Body(ValidationPipe) authCredentialsDto:CreateAuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }
}
