import { Body, Controller, Post } from '@nestjs/common';

import {
  ConfirmPasswordResetDto,
  RequestPasswordResetDto,
} from './password-reset.dto';
import { PasswordResetService } from './password-reset.service';

@Controller('password-reset')
export class PasswordResetController {
  constructor(private readonly passwordResetService: PasswordResetService) {}

  @Post('confirm')
  confirmPasswordReset(@Body() dto: ConfirmPasswordResetDto) {
    return this.passwordResetService.confirmPasswordReset(dto);
  }

  @Post('request')
  requestPasswordReset(@Body() dto: RequestPasswordResetDto) {
    return this.passwordResetService.requestPasswordReset(dto);
  }
}
