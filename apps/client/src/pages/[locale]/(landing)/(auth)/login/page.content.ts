import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    dontHaveAccount: t({
      en: "Don't have an account?",
      tr: "Hesabınız yok mu?",
    }),
    error: t({
      en: "Failed to login. Please try again.",
      tr: "Giriş yapılamadı. Lütfen tekrar deneyin.",
    }),
    forgotPassword: t({
      en: "Forgot Password?",
      tr: "Parolamı Unuttum?",
    }),
    inputs: {
      email: t({
        en: "Email",
        tr: "E-posta",
      }),
      password: t({
        en: "Password",
        tr: "Şifre",
      }),
      submit: t({
        en: "Login",
        tr: "Giriş Yap",
      }),
    },
    register: t({
      en: "Sign Up",
      tr: "Kayıt Ol",
    }),
    subtitle: t({
      en: "Enter your email and password to access your account.",
      tr: "Hesabınıza erişmek için e-posta ve şifrenizi girin.",
    }),
    success: t({
      en: "Successfully logged in!",
      tr: "Başarıyla giriş yapıldı!",
    }),
    title: t({
      en: "Login to your account",
      tr: "Hesabınıza giriş yapın",
    }),
  },
  key: "login-page",
} satisfies Dictionary;
