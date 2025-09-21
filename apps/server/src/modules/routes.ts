import { AccountModule } from './account/account.module';
import { AuthModule } from './auth';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { FilesModule } from './files/files.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { PostsModule } from './posts/posts.module';
import { TokensModule } from './tokens';
import { TranslationsModule } from './translations/translations.module';
import { UsersModule } from './users';

const modules = {
  AccountModule,
  AuthGoogleModule,
  AuthModule,
  FilesModule,
  PasswordResetModule,
  PostsModule,
  TokensModule,
  TranslationsModule,
  UsersModule,
};

export default Object.values(modules);
