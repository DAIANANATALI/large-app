import { Body, Controller, Patch, UseGuards } from '@nestjs/common';

import { CurrentUser } from '~/common/decorators';
import { AuthGuard } from '~/common/guards';

import { UpdateProfileDto, UpdateUserDto } from './account.dto';
import { AccountService } from './account.service';

@Controller('account')
@UseGuards(AuthGuard)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Patch('profile')
  updateProfile(
    @CurrentUser('id') userId: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.accountService.updateProfile(userId, updateProfileDto);
  }

  @Patch()
  updateUser(
    @CurrentUser('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.accountService.updateUser(userId, updateUserDto);
  }
}
