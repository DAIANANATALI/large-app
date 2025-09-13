import type { OnModuleInit } from '@nestjs/common';

import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@repo/db';

import { BaseQueryDto } from './prisma.dto';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  buildQueryOptions(options: BaseQueryDto, searchableFields: string[] = []) {
    const { include, search, ...pagination } = options;
    const query: Record<string, unknown> = {};

    query.take = pagination.limit;
    query.skip = (pagination.page - 1) * pagination.limit;

    if (search && searchableFields.length) {
      query.where = {
        OR: searchableFields.map((field) => ({
          [field]: { contains: search, mode: 'insensitive' },
        })),
      };
    }

    query.include = this.buildInclude(include);

    return query;
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

  private buildInclude(include?: string) {
    if (!include) return undefined;

    const root: Record<string, any> = {};

    const addPath = (path: string) => {
      const parts = path
        .split('.')
        .map((p) => p.trim())
        .filter(Boolean);

      if (!parts.length) return;

      let cursor: Record<string, any> = root;

      for (let i = 0; i < parts.length; i++) {
        const key = parts[i];
        const isLast = i === parts.length - 1;
        const existing = cursor[key];

        if (isLast) {
          // If nested already exists, keep it; otherwise set true
          if (!existing) cursor[key] = true;
        } else {
          // Ensure nested include object exists
          if (existing === true) {
            cursor[key] = { include: {} };
          } else if (!existing) {
            cursor[key] = { include: {} };
          }
          cursor = cursor[key].include;
        }
      }
    };

    include
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach(addPath);

    return root;
  }
}
