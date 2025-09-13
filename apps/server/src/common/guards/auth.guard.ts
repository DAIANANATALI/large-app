import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { PrismaService } from '~/database';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('No authorization header provided');
    }

    const token = this.extractToken(authHeader);

    if (!token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    const tokenRecord = await this.prisma.token.findUnique({
      include: { user: { include: { profile: true } } },
      where: { token },
    });

    if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    req.user = tokenRecord.user;

    return true;
  }

  extractToken(authHeader: string) {
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }
}
