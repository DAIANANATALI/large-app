import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    actions: {
      create: t({
        en: "Create Post",
        tr: "Gönderi Oluştur",
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
      en: "You have no posts yet.",
      tr: "Henüz gönderiniz yok.",
    }),
    subtitle: t({
      en: "Manage your posts",
      tr: "Gönderilerinizi yönetin",
    }),
    title: t({
      en: "Posts",
      tr: "Gönderiler",
    }),
  },
  key: "dashboard.posts",
} satisfies Dictionary;
