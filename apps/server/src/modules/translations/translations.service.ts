import { Injectable } from '@nestjs/common';
import slugify from 'slugify';

import { PrismaService } from '~/database';

import { CreateTranslationDto, UpdateTranslationDto } from './translations.dto';

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

  async findAll() {
    const translations = await this.prisma.postTranslation.findMany();

    return translations;
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
