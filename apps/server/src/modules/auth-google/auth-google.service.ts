import { BadRequestException, Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

import { PrismaService } from '~/database';

import { TokensService } from '../tokens';
import { UsersService } from '../users';

@Injectable()
export class AuthGoogleService {
  private oauthClient: OAuth2Client;

  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
    private usersService: UsersService,
  ) {
    this.oauthClient = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
  }

  async getGooglePayload(code: string) {
    const { tokens } = await this.oauthClient.getToken({
      code,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    });

    this.oauthClient.setCredentials(tokens);

    if (!tokens.id_token) {
      throw new BadRequestException('Unable to fetch user info from Google');
    }

    const ticket = await this.oauthClient.verifyIdToken({
      idToken: tokens.id_token,
    });

    return ticket.getPayload();
  }

  async linkAccount(userId: string, code: string) {
    const payload = await this.getGooglePayload(code);

    if (!payload || !payload.email) {
      throw new BadRequestException('Unable to fetch user info from Google');
    }

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (user.googleId) {
      throw new BadRequestException('Google account already linked');
    }

    const existingUser = await this.prisma.user.findUnique({
      where: { googleId: payload.sub },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Google account already linked to another user',
      );
    }

    await this.prisma.user.update({
      data: { googleId: payload.sub },
      where: { id: userId },
    });

    return { success: true };
  }

  async login(code: string) {
    const payload = await this.getGooglePayload(code);

    if (!payload || !payload.email) {
      throw new BadRequestException('Unable to fetch user info from Google');
    }

    let user = await this.prisma.user.findUnique({
      where: { googleId: payload.sub },
    });

    if (!user) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: payload.email },
      });

      if (existingUser) {
        throw new BadRequestException(
          'User with this email already exists. Please login using your email and password.',
        );
      }

      user = await this.usersService.create({
        displayName: payload.name || payload.email.split('@')[0],
        email: payload.email,
        googleId: payload.sub,
        username: crypto.randomBytes(8).toString('hex'),
      });
    }

    const { token } = await this.tokensService.createToken(user.id);

    return { token, userId: user.id };
  }

  async unlinkAccount(userId: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    if (!user.googleId) {
      throw new BadRequestException('No linked Google account found');
    }

    await this.prisma.user.update({
      data: { googleId: null },
      where: { id: userId },
    });

    return { success: true };
  }
}
