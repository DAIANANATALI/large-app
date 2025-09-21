import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsString()
  displayName?: string;
}

export class UpdateUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsString()
  username?: string;
}
