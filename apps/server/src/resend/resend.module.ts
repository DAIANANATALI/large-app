import { Global, Module } from '@nestjs/common';

import { ResendService } from './resend.service';

@Global()
@Module({
  exports: [ResendService],
  providers: [ResendService],
})
export class ResendModule {}
