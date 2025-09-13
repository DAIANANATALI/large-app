import { AuthModule } from './auth';
import { AuthGoogleModule } from './auth-google/auth-google.module';
import { PostsModule } from './posts/posts.module';
import { TokensModule } from './tokens';
import { TranslationsModule } from './translations/translations.module';
import { UsersModule } from './users';

const modules = {
  AuthGoogleModule,
  AuthModule,
  PostsModule,
  TokensModule,
  TranslationsModule,
  UsersModule,
};

export default Object.values(modules);
