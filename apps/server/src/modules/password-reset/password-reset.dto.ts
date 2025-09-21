import { IsString } from 'class-validator';

export class ConfirmPasswordResetDto {
  @IsString()
  newPassword: string;

  @IsString()
  token: string;
}

export class RequestPasswordResetDto {
  @IsString()
  email: string;
}
