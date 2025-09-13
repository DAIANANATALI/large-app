import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    error: t({
      en: "Registration failed. Please try again.",
      tr: "Kayıt başarısız oldu. Lütfen tekrar deneyin.",
    }),
    haveAccount: t({
      en: "Already have an account?",
      tr: "Zaten hesabınız var mı?",
    }),
    inputs: {
      confirmPassword: t({
        en: "Confirm Password",
        tr: "Şifreyi Onayla",
      }),
      displayName: t({
        en: "Display Name",
        tr: "Görünen İsim",
      }),
      email: t({
        en: "Email",
        tr: "E-posta",
      }),
      password: t({
        en: "Password",
        tr: "Şifre",
      }),
      submit: t({
        en: "Sign Up",
        tr: "Kayıt Ol",
      }),
      username: t({
        en: "Username",
        tr: "Kullanıcı Adı",
      }),
    },
    login: t({
      en: "Login",
      tr: "Giriş Yap",
    }),
    passwordsDoNotMatch: t({
      en: "Passwords do not match",
      tr: "Şifreler eşleşmiyor",
    }),
    subtitle: t({
      en: "Create your account to get started.",
      tr: "Başlamak için hesabınızı oluşturun.",
    }),
    success: t({
      en: "Registration successful!",
      tr: "Kayıt başarılı!",
    }),
    title: t({
      en: "Create an account",
      tr: "Hesap oluştur",
    }),
  },
  key: "register-page",
} satisfies Dictionary;
