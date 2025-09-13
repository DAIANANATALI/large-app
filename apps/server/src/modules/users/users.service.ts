import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@repo/db';
import argon2 from 'argon2';

import { PrismaService } from '~/database';

import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const uniqueFields = [
      'username',
      'email',
      'phone',
    ] as (keyof CreateUserDto)[];

    for (const field of uniqueFields) {
      if (createUserDto[field]) {
        const existingUser = await this.prisma.user.findFirst({
          where: {
            [field]: createUserDto[field],
          } as Prisma.UserWhereInput,
        });

        if (existingUser) {
          throw new BadRequestException(
            `User with this ${field} already exists`,
          );
        }
      }
    }

    if (createUserDto.password) {
      createUserDto.password = await argon2.hash(createUserDto.password);
    }

    const { displayName, ...rest } = createUserDto;

    const user = await this.prisma.user.create({
      data: {
        ...rest,
        profile: {
          create: {
            displayName,
          },
        },
      },
    });

    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.user.delete({
      where: { id },
    });

    return { deleted: true };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });

    return user;
  }
}
