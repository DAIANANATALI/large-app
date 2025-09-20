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

import { AuthGuard } from '~/common/guards';

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
  @UseGuards(AuthGuard)
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
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.translationsService.remove(id);
  }

  @Post(':id/translate')
  @UseGuards(AuthGuard)
  translate(@Param('id') id: string, @Body('to') to: string[]) {
    return this.translationsService.translate(id, to);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTranslationDto: UpdateTranslationDto,
  ) {
    return this.translationsService.update(id, updateTranslationDto);
  }
}
