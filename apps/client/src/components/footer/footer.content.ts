import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    builtBy: t({
      en: "Built by Halil Aydın",
      tr: "Halil Aydın tarafından geliştirildi",
    }),
    links: {
      home: t({
        en: "Home",
        tr: "Ana Sayfa",
      }),
      posts: t({
        en: "Posts",
        tr: "Gönderiler",
      }),
    },
    privacyPolicy: t({
      en: "Privacy Policy",
      tr: "Gizlilik Politikası",
    }),
    quickLinks: t({
      en: "Quick Links",
      tr: "Hızlı Linkler",
    }),
    socialLinks: t({
      en: "Social Links",
      tr: "Sosyal Linkler",
    }),
    subtitle: t({
      en: "A place for your big ideas",
      tr: "Büyük fikirleriniz için bir yer",
    }),
    termsOfService: t({
      en: "Terms of Service",
      tr: "Hizmet Şartları",
    }),
    title: t({
      en: "LARGE",
      tr: "LARGE",
    }),
  },
  key: "footer",
} satisfies Dictionary;
