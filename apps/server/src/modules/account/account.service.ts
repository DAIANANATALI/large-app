import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '~/database';

import { UpdateProfileDto, UpdateUserDto } from './account.dto';

@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string) {
    const user = await this.prisma.user.findUnique({
      include: { profile: true },
      where: { id: userId },
    });

    return user;
  }

  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const profile = this.prisma.profile.update({
      data: updateProfileDto,
      where: { userId },
    });

    return profile;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUserById(userId);

    if (updateUserDto.email && user?.email !== updateUserDto.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: updateUserDto.email },
      });

      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    if (updateUserDto.username && user?.username !== updateUserDto.username) {
      const existingUser = await this.prisma.user.findUnique({
        where: { username: updateUserDto.username },
      });

      if (existingUser) {
        throw new BadRequestException('Username already in use');
      }
    }

    const updatedUser = this.prisma.user.update({
      data: updateUserDto,
      where: { id: userId },
    });

    return updatedUser;
  }
}
