import { Module } from '@nestjs/common';

import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  controllers: [TokensController],
  exports: [TokensService],
  providers: [TokensService],
})
export class TokensModule {}
