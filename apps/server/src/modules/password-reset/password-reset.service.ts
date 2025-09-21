import { BadRequestException, Injectable } from '@nestjs/common';
import argon2 from 'argon2';
import crypto from 'crypto';

import { PrismaService } from '~/database';
import { ResendService } from '~/resend';

import {
  ConfirmPasswordResetDto,
  RequestPasswordResetDto,
} from './password-reset.dto';

@Injectable()
export class PasswordResetService {
  tokens = new Map<string, string>();

  constructor(
    private prisma: PrismaService,
    private resend: ResendService,
  ) {}

  async confirmPasswordReset(dto: ConfirmPasswordResetDto) {
    const userId = this.tokens.get(dto.token);
    if (!userId) {
      throw new BadRequestException('Invalid or expired token');
    }

    const hashedPassword = await argon2.hash(dto.newPassword);

    await this.prisma.user.update({
      data: { password: hashedPassword },
      where: { id: userId },
    });

    this.tokens.delete(dto.token);

    return { success: true };
  }

  async requestPasswordReset(dto: RequestPasswordResetDto) {
    const user = await this.prisma.user.findUnique({
      include: { profile: true },
      where: { email: dto.email },
    });

    if (!user) {
      return { success: true };
    }

    const token = crypto.randomBytes(32).toString('hex');

    this.tokens.set(token, user.id);

    const resetlink = new URL('/en/reset-password', process.env.APP_URL);
    resetlink.searchParams.set('token', token);

    await this.resend.sendEmail({
      from: this.resend.from,
      subject: 'Password Reset Request',
      template: 'forgot-password',
      templateData: {
        name: user.profile?.displayName || 'User',
        resetLink: resetlink.toString(),
      },
      text: '',
      to: user.email,
    });

    return { success: true };
  }
}
