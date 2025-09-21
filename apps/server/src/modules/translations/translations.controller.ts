import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, PostAuthorshipGuard } from '~/common/guards';
import { TranslationAuthorshipGuard } from '~/common/guards/translation-authorship.guard';

import {
  CreateTranslationDto,
  TranslationQueryDto,
  UpdateTranslationDto,
} from './translations.dto';
import { TranslationsService } from './translations.service';

@Controller('translations')
export class TranslationsController {
  constructor(private readonly translationsService: TranslationsService) {}

  @Post()
  @UseGuards(AuthGuard, PostAuthorshipGuard)
  create(@Body() createTranslationDto: CreateTranslationDto) {
    return this.translationsService.create(createTranslationDto);
  }

  @Get()
  findAll(@Query() query: TranslationQueryDto) {
    return this.translationsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, TranslationAuthorshipGuard)
  remove(@Param('id') id: string) {
    return this.translationsService.remove(id);
  }

  @Post(':id/translate')
  @UseGuards(AuthGuard, TranslationAuthorshipGuard)
  translate(@Param('id') id: string, @Body('to') to: string[]) {
    return this.translationsService.translate(id, to);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, TranslationAuthorshipGuard)
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.translationsService.update(id, updateTranslationDto);
  }
}
