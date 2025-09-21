import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';

import { PrismaService } from '~/database';

@Injectable()
export class PostAuthorshipGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    if (!req.user) {
      return false;
    }

    if (req.user.roles.includes('ADMIN')) {
      return true;
    }

    const postId = this.extractPostId(req);
    const post = await this.prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    if (req.user.id === post.authorId) {
      return true;
    }

    return false;
  }

  extractPostId(req: Request) {
    if (req.params && req.params.id && req.url.startsWith('/posts'))
      return req.params.id;
    if (req.params && req.params.postId) return req.params.postId;
    if (req.body && req.body.postId) return req.body.postId;
    throw new BadRequestException('Post ID not provided in request');
  }
}
