import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard, PostAuthorshipGuard } from '~/common/guards';

import { CreateTranslationDto, UpdateTranslationDto } from './translations.dto';
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
  findAll() {
    return this.translationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.translationsService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, PostAuthorshipGuard)
  remove(@Param('id') id: string) {
    return this.translationsService.remove(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, PostAuthorshipGuard)
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.translationsService.update(id, updateTranslationDto);
  }
}
