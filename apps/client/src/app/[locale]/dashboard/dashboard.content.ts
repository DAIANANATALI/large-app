import { type Dictionary, t } from "intlayer";

export default {
  content: {
    items: {
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
  },
  key: "dashboard",
} satisfies Dictionary;
