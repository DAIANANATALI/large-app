import { type Dictionary, t } from "intlayer";

export default {
  content: {
    meta: {
      description: t({
        en: "Browse the latest posts on MyApp.",
        tr: "MyApp üzerinden en son gönderilere göz atın.",
      }),
      keywords: t({
        en: "posts, articles, blog",
        tr: "gönderiler, makaleler, blog",
      }),
      title: t({
        en: "Posts - MyApp",
        tr: "Gönderiler - MyApp",
      }),
    },
    subtitle: t({
      en: "Check out the latest posts from our community.",
      tr: "Topluluğumuzun en son gönderilerine göz atın.",
    }),
    title: t({
      en: "Posts",
      tr: "Gönderiler",
    }),
  },
  key: "landing.posts",
} satisfies Dictionary;
