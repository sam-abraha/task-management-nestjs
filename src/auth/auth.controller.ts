import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredialsDto : AuthCredentialsDto) : Promise<void> {
    return this.authService.signUp(authCredialsDto);
  }

  @Post('/signin')
  signIn(@Body() authCredialsDto : AuthCredentialsDto) : Promise<{ accessToken : string}> {
    return this.authService.signIn(authCredialsDto);
  }

}