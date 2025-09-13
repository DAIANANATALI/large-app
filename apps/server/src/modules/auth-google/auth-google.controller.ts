import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { CurrentUser } from '~/common/decorators';
import { AuthGuard } from '~/common/guards';

import { AuthGoogleService } from './auth-google.service';

@Controller('auth/google')
export class AuthGoogleController {
  constructor(private readonly authGoogleService: AuthGoogleService) {}

  @Post('link')
  @UseGuards(AuthGuard)
  linkAccount(@CurrentUser('id') userId: string, @Body('code') code: string) {
    return this.authGoogleService.linkAccount(userId, code);
  }

  @Post()
  login(@Body('code') code: string) {
    return this.authGoogleService.login(code);
  }

  @Post('unlink')
  @UseGuards(AuthGuard)
  unlinkAccount(@CurrentUser('id') userId: string) {
    return this.authGoogleService.unlinkAccount(userId);
  }
}
