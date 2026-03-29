import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('magic-link')
  async login(@Body('email') email: string) {
    return this.authService.generateMagicLink(email);
  }

  @Get('verify')
  async verify(@Query('token') token: string) {
    return this.authService.verifyMagicLink(token);
  }
}
