import { User } from '@repo/db';

declare module 'express' {
  interface Request {
    user?: User;
  }
}
