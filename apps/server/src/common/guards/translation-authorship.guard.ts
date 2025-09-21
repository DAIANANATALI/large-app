import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { PrismaService } from '~/database';

@Injectable()
export class TranslationAuthorshipGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.user) {
      return false;
    }

    if (req.user.roles.includes('ADMIN')) {
      return true;
    }

    const translationId = this.extractId(req);
    const translation = await this.prisma.postTranslation.findUnique({
      include: { post: true },
      where: { id: translationId },
    });

    if (!translation) {
      throw new BadRequestException('Post not found');
    }

    if (req.user.id === translation.post.authorId) {
      return true;
    }

    return false;
  }

  extractId(req: Request) {
    if (req.params && req.params.id) return req.params.id;
    if (req.params && req.params.translationId) return req.params.translationId;
    if (req.body && req.body.translationId) return req.body.translationId;
    throw new BadRequestException('Translation ID not provided in request');
  }
}
