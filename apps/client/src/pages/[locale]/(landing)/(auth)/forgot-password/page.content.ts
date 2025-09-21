import { type Dictionary, t } from "intlayer";

export default {
  content: {
    back: t({ en: "Back", tr: "Geri" }),
    inputs: {
      email: t({ en: "Email", tr: "E-posta" }),
      submit: t({ en: "Submit", tr: "Gönder" }),
    },
    subtitle: t({
      en: "Enter your email to reset your password.",
      tr: "Parolanızı sıfırlamak için e-postanızı girin.",
    }),
    title: t({
      en: "Forgot your password?",
      tr: "Parolanızı mı unuttunuz?",
    }),
    toasts: {
      error: t({
        en: "There was an error processing your request. Please try again later.",
        tr: "İsteğiniz işlenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.",
      }),
      success: t({
        en: "If an account with that email exists, a password reset link has been sent.",
        tr: "Eğer bu e-posta ile bir hesap varsa, parola sıfırlama bağlantısı gönderildi.",
      }),
    },
  },
  key: "auth.forgot-password",
} satisfies Dictionary;
