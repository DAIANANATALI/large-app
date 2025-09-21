import { type Dictionary, t } from "intlayer";

export default {
  content: {
    back: t({ en: "Back", tr: "Geri" }),
    inputs: {
      confirmPassword: t({ en: "Confirm Password", tr: "Parolayı Onayla" }),
      password: t({ en: "New Password", tr: "Yeni Parola" }),
      submit: t({ en: "Reset Password", tr: "Parolayı Sıfırla" }),
    },
    subtitle: t({
      en: "Enter your new password below.",
      tr: "Yeni parolanızı aşağıya girin.",
    }),
    title: t({
      en: "Reset your password",
      tr: "Parolanızı sıfırlayın",
    }),
    toasts: {
      error: t({
        en: "There was an error resetting your password. Please try again later.",
        tr: "Parolanızı sıfırlarken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      }),
      success: t({
        en: "Your password has been successfully reset. You can now log in with your new password.",
        tr: "Parolanız başarıyla sıfırlandı. Artık yeni parolanızla giriş yapabilirsiniz.",
      }),
    },
  },
  key: "auth.reset-password",
} satisfies Dictionary;
