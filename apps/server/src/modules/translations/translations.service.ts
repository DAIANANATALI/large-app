import { Injectable } from '@nestjs/common';
import { Prisma } from '@repo/db';
import slugify from 'slugify';

import { PrismaService } from '~/database';
import { cleanObject } from '~/lib/utils';

import {
  CreateTranslationDto,
  TranslationQueryDto,
  UpdateTranslationDto,
} from './translations.dto';

@Injectable()
export class TranslationsService {
  constructor(private prisma: PrismaService) {}

  async create(createTranslationDto: CreateTranslationDto) {
    const { postId, ...rest } = createTranslationDto;

    const translation = await this.prisma.postTranslation.create({
      data: {
        ...rest,
        post: {
          connect: {
            id: postId,
          },
        },
        slug: this.makeSlug(rest.title),
      },
    });

    return translation;
  }

  async findAll(query: TranslationQueryDto) {
    const { locale, postId, ...rest } = query;

    const args = this.prisma.buildQueryOptions(rest, [
      'title',
      'content',
    ]) as Prisma.PostTranslationFindManyArgs;

    args.where = {
      ...args.where,
      ...cleanObject({ locale, postId }),
    };

    const translations = await this.prisma.postTranslation.findMany({
      ...args,
      include: {
        post: { include: { author: { include: { profile: true } } } },
      },
    });

    return {
      items: translations,
      meta: {
        limit: rest.limit,
        page: rest.page,
        total: await this.prisma.postTranslation.count({ where: args.where }),
      },
    };
  }

  async findOne(id: string) {
    const translation = await this.prisma.postTranslation.findFirst({
      include: { post: true },
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    return translation;
  }

  makeSlug(title: string) {
    return [
      slugify(title, { lower: true, strict: true }),
      '_',
      Date.now().toString(),
    ].join('');
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.postTranslation.delete({
      where: { id },
    });

    return { deleted: true };
  }

  async update(id: string, updateTranslationDto: UpdateTranslationDto) {
    await this.findOne(id);

    const translation = await this.prisma.postTranslation.update({
      data: updateTranslationDto,
      where: { id },
    });

    return translation;
  }
}
