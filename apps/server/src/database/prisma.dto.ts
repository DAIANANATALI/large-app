import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  limit = 10;

  @IsNumber()
  @IsOptional()
  page = 1;
}

export class BaseQueryDto extends PaginationDto {
  @IsOptional()
  @IsString()
  include?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
