import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '~/database';

import { CreatePostDto, UpdatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createPostDto: CreatePostDto) {
    const post = await this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
      },
    });

    return post;
  }

  async findAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      include: {
        author: { select: { id: true, profile: true, username: true } },
      },
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.postTranslation.deleteMany({
      where: { postId: id },
    });

    await this.prisma.post.delete({
      where: { id },
    });

    return { deleted: true };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    await this.findOne(id);

    const post = await this.prisma.post.update({
      data: updatePostDto,
      where: { id },
    });

    return post;
  }
}
