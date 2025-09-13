import { SetMetadata } from '@nestjs/common';
import { Role } from '@repo/db';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
