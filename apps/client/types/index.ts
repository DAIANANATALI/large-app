import type {
  Post as PrismaPost,
  PostTranslation as PrismaPostTranslation,
  Profile as PrismaProfile,
  User as PrismaUser,
} from "@repo/db";

export interface Post extends PrismaPost {
  author?: User;
}

export interface PostTranslation extends PrismaPostTranslation {
  author?: User;
  post?: Post;
}

export interface User extends PrismaUser {
  profile?: PrismaProfile;
}
