import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '~/database';
import routes from '~/modules/routes';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PrismaModule, ...routes],
})
export class AppModule {}
