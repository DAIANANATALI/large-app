import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString } from 'class-validator';

export class CreateTranslationDto {
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString({ each: true })
  keywords?: string[];

  @IsString()
  locale: string;

  @IsString()
  postId: string;

  @IsString()
  title: string;
}

export class TranslationQueryDto {
  @IsOptional()
  @IsString()
  locale?: string;

  @IsOptional()
  @IsString()
  postId?: string;
}

export class UpdateTranslationDto extends PartialType(CreateTranslationDto) {}
