import { type Dictionary, t } from "intlayer";

export default {
  content: {
    items: {
      about: t({
        en: "About",
        tr: "Hakkımda",
      }),
      contact: t({
        en: "Contact",
        tr: "İletişim",
      }),
      dashboard: t({
        en: "Dashboard",
        tr: "Kontrol Paneli",
      }),
      home: t({
        en: "Home",
        tr: "Ana Sayfa",
      }),
      login: t({
        en: "Login",
        tr: "Giriş Yap",
      }),
      posts: t({
        en: "Posts",
        tr: "Gönderiler",
      }),
      profile: t({
        en: "Profile",
        tr: "Profil",
      }),
      register: t({
        en: "Register",
        tr: "Kayıt Ol",
      }),
      settings: t({
        en: "Settings",
        tr: "Ayarlar",
      }),
    },
  },
  key: "navbar",
} satisfies Dictionary;
