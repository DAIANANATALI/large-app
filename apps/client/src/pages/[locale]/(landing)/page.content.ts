import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    cta: {
      dashboard: t({
        en: "Go to Dashboard",
        tr: "Kontrol Paneline Git",
      }),
      getStarted: t({
        en: "Start Blogging Now",
        tr: "Şimdi Blog Yazmaya Başla",
      }),
      subtitle: t({
        en: "Join LARGE today and start sharing your big ideas with the world.",
        tr: "Bugün LARGE'a katılın ve büyük fikirlerinizi dünyayla paylaşmaya başlayın.",
      }),
      title: t({
        en: "Ready to get started?",
        tr: "Başlamaya hazır mısınız?",
      }),
    },
    features: {
      exploreMore: t({
        en: "Explore More Features",
        tr: "Daha Fazla Özelliği Keşfedin",
      }),
      items: {
        aiAssistance: {
          description: t({
            en: "Leverage AI to help you draft and refine your posts effortlessly.",
            tr: "Yapay zekayı kullanarak gönderilerinizi zahmetsizce taslak oluşturun ve geliştirin.",
          }),
          title: t({
            en: "AI Assistance",
            tr: "Yapay Zeka Desteği",
          }),
        },
        multilingual: {
          description: t({
            en: "Easily switch between multiple languages to reach a global audience.",
            tr: "Küresel bir kitleye ulaşmak için birden çok dil arasında kolayca geçiş yapın.",
          }),
          title: t({
            en: "Multilingual Support",
            tr: "Çok Dilli Destek",
          }),
        },
        themes: {
          description: t({
            en: "Choose from light, dark, or system themes to match your preference.",
            tr: "Tercihinize uygun olarak açık, koyu veya sistem temalarından seçim yapın.",
          }),
          title: t({
            en: "Theme Options",
            tr: "Tema Seçenekleri",
          }),
        },
      },
      subtitle: t({
        en: "Explore the powerful features that make LARGE the perfect platform for your ideas.",
        tr: "LARGE'ı fikirleriniz için mükemmel platform yapan güçlü özellikleri keşfedin.",
      }),
      title: t({
        en: "Features",
        tr: "Özellikler",
      }),
    },
    hero: {
      builtBy: t({
        en: "Built by AydinTheFirst",
        tr: "AydinTheFirst tarafından geliştirildi",
      }),
      dashboard: t({
        en: "Dashboard",
        tr: "Kontrol Paneli",
      }),
      getStarted: t({
        en: "Get Started",
        tr: "Başlayın",
      }),
      subtitle: t({
        en: "Share your thoughts with the world. Supports multiple languages and themes.",
        tr: "Düşüncelerinizi dünyayla paylaşın. Birden çok dil ve tema destekler.",
      }),
      title: t({
        en: "LARGE - A place for your big ideas",
        tr: "LARGE - Büyük fikirleriniz için bir yer",
      }),
    },
  },
  key: "landing.index",
} satisfies Dictionary;
