export interface PaginatedResult<T> {
  items: T[];
  meta: {
    limit: number;
    page: number;
    total: number;
  };
}

export interface Post {
  author?: null | User;
  authorId: string;
  createdAt: Date;
  description?: null | string;
  id: string;
  isPublished: boolean;
  title: string;

  translations?: null | PostTranslation[];
  updatedAt: Date;
}

export interface PostTranslation {
  content: string;
  createdAt: Date;
  description?: null | string;
  id: string;
  keywords: string[];
  locale: string;
  post?: null | Post;
  postId: string;
  slug: string;
  title: string;

  updatedAt: Date;
}

export interface Profile {
  avatarUrl?: null | string;
  bio?: null | string;
  createdAt: Date;
  displayName: string;
  id: string;
  updatedAt: Date;
  user?: null | User;

  userId: string;
}

// @repo/db-types/index.d.ts
export type Role = "ADMIN" | "USER";

export interface Token {
  createdAt: Date;
  expiresAt: Date;
  id: string;
  token: string;
  user?: null | User;

  userId: string;
}

export interface User {
  createdAt: Date;
  email: string;
  googleId?: null | string;
  id: string;
  password?: null | string;
  phone?: null | string;
  posts?: null | Post[];
  profile?: null | Profile;
  roles: Role[];

  tokens?: null | Token[];
  updatedAt: Date;
  username: string;
}
