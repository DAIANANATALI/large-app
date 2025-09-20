import { Module } from '@nestjs/common';

import { AiService } from './ai.service';
import { TranslationsController } from './translations.controller';
import { TranslationsService } from './translations.service';

@Module({
  controllers: [TranslationsController],
  providers: [TranslationsService, AiService],
})
export class TranslationsModule {}
