import { type Dictionary, t } from "intlayer";

export default {
  content: {
    form: {
      submit: t({
        en: "Translate",
        tr: "Çevir",
      }),
      to: t({
        en: "Translate to",
        tr: "Şuraya çevir",
      }),
    },
    modal: {
      close: t({
        en: "Close",
        tr: "Kapat",
      }),
      subtitle: t({
        en: "Select the languages you want to translate the content into.",
        tr: "İçeriği çevirmek istediğiniz dilleri seçin.",
      }),
      title: t({
        en: "Translate Content",
        tr: "İçeriği Çevir",
      }),
    },
    toast: {
      error: t({
        en: "Failed to submit translation request.",
        tr: "Çeviri isteği gönderilemedi.",
      }),
      success: t({
        en: "Translation request submitted successfully.",
        tr: "Çeviri isteği başarıyla gönderildi.",
      }),
    },
    trigger: t({
      en: "Translate",
      tr: "Çevir",
    }),
  },
  key: "dashboard.translations.translate",
} satisfies Dictionary;
