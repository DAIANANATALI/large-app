import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

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

export class UpdatePostDto extends PartialType(CreatePostDto) {}
