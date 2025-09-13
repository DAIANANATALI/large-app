import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest() as Request;
    if (!user) {
      throw new UnauthorizedException(
        'You need to be authenticated to access this resource',
      );
    }

    const isAllowed = this.matchRoles(roles, user.roles);

    if (!isAllowed) {
      throw new ForbiddenException(
        "You don't have permission to access this resource",
      );
    }

    return isAllowed;
  }

  matchRoles = (roles: string[], userRoles: string[]): boolean => {
    return roles.some((role) => userRoles.includes(role));
  };
}
