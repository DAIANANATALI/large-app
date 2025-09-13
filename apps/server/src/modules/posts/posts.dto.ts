import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { BaseQueryDto } from '~/database';

export class CreatePostDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;

  @IsString()
  title: string;
}

export class PostQueryDto extends BaseQueryDto {}

export class UpdatePostDto extends PartialType(CreatePostDto) {}
