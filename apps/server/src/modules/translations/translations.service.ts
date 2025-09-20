import { Injectable, NotFoundException } from '@nestjs/common';
import { PostTranslation, Prisma } from '@repo/db';
import slugify from 'slugify';

import { PrismaService } from '~/database';
import { cleanObject } from '~/lib/utils';

import { AiService } from './ai.service';
import {
  CreateTranslationDto,
  TranslationQueryDto,
  UpdateTranslationDto,
} from './translations.dto';

@Injectable()
export class TranslationsService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

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

    if (!translation) {
      throw new NotFoundException('Translation not found');
    }

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

  async translate(id: string, to: string[]) {
    const translation = await this.findOne(id);

    const results = await this.aiService.generateTranslation(translation, to);

    const createdTranslations: PostTranslation[] = [];
    for (const result of results) {
      const created = await this.prisma.postTranslation.create({
        data: {
          content: result.content,
          description: result.description,
          keywords: result.keywords,
          locale: result.locale,
          post: {
            connect: {
              id: translation.postId,
            },
          },
          slug: this.makeSlug(result.title),
          title: result.title,
        },
      });
      createdTranslations.push(created);
    }

    return createdTranslations;
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
