import { BadRequestException, Injectable } from '@nestjs/common';
import argon from 'argon2';

import { PrismaService } from '~/database';

import { TokensService } from '../tokens';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private tokensService: TokensService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { username: email }] },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.password) {
      throw new BadRequestException('No password set for this user');
    }

    const isPasswordValid = await argon.verify(user.password, password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const { token, userId } = await this.tokensService.createToken(user.id);

    return { token, userId };
  }
}
