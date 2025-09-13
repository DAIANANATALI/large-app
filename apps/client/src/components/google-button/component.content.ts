import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    error: t({
      en: "Google sign-in failed. Please try again.",
      tr: "Google ile giriş başarısız oldu. Lütfen tekrar deneyin.",
    }),
    label: t({
      en: "Sign in with Google",
      tr: "Google ile giriş yap",
    }),
  },
  key: "google-button",
} satisfies Dictionary;
