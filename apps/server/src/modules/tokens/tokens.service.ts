import { Injectable } from '@nestjs/common';
import crypto from 'crypto';
import { addDays } from 'date-fns';

import { PrismaService } from '~/database';

@Injectable()
export class TokensService {
  constructor(private prismaService: PrismaService) {}

  async createToken(userId: string) {
    const token = await this.prismaService.token.create({
      data: {
        expiresAt: addDays(new Date(), 7),
        token: crypto.randomBytes(32).toString('hex'),
        userId,
      },
    });

    return token;
  }
}
