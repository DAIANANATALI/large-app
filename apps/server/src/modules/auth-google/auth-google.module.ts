import { Module } from '@nestjs/common';

import { TokensService } from '../tokens';
import { UsersService } from '../users';
import { AuthGoogleController } from './auth-google.controller';
import { AuthGoogleService } from './auth-google.service';

@Module({
  controllers: [AuthGoogleController],
  providers: [AuthGoogleService, TokensService, UsersService],
})
export class AuthGoogleModule {}
