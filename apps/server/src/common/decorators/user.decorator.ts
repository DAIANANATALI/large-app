import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@repo/db';
import { Request } from 'express';

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest() as Request;
    if (!user) return null;
    return data ? user[data] : user;
  },
);
