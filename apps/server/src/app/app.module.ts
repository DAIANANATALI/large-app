import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from '~/database';
import routes from '~/modules/routes';
import { ResendModule } from '~/resend';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ResendModule,
    PrismaModule,
    ...routes,
  ],
})
export class AppModule {}
