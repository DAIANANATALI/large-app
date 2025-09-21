import { type Dictionary, t } from "intlayer";

export default {
  content: {
    items: {
      account: t({
        en: "Account",
        tr: "Hesap",
      }),
      dashboard: t({
        en: "Dashboard",
        tr: "Kontrol Paneli",
      }),
      posts: t({
        en: "Posts",
        tr: "Gönderiler",
      }),
      settings: t({
        en: "Settings",
        tr: "Ayarlar",
      }),
      translations: t({
        en: "Translations",
        tr: "Çeviriler",
      }),
    },
    search: t({
      en: "Search...",
      tr: "Ara...",
    }),
  },
  key: "dashboard",
} satisfies Dictionary;
