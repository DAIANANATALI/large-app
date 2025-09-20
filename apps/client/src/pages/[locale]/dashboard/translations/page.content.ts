import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    actions: {
      create: t({
        en: "Create Translation",
        tr: "Çeviri Oluştur",
      }),
      edit: t({
        en: "Edit",
        tr: "Düzenle",
      }),
      view: t({
        en: "View",
        tr: "Görüntüle",
      }),
    },
    noData: t({
      en: "No translations found.",
      tr: "Çeviri bulunamadı.",
    }),
    subtitle: t({
      en: "Manage your translations",
      tr: "Çevirilerinizi yönetin",
    }),
    title: t({
      en: "Post Translations",
      tr: "Gönderi Çevirileri",
    }),
  },
  key: "dashboard.translations",
} satisfies Dictionary;
