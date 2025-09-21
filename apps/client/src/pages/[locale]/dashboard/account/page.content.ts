import { type Dictionary, t } from "intlayer";

export default {
  content: {
    subtitle: t({
      en: "Manage your account settings and set e.g. your profile picture.",
      tr: "Hesap ayarlarınızı yönetin ve örn. profil resminizi ayarlayın.",
    }),
    title: t({
      en: "Account Settings",
      tr: "Hesap Ayarları",
    }),
    toasts: {
      error: t({
        en: "An error occurred while updating the profile",
        tr: "Profil güncellenirken bir hata oluştu",
      }),
      success: t({
        en: "Profile updated successfully",
        tr: "Profil başarıyla güncellendi",
      }),
    },
    userForm: {
      email: t({
        en: "Email",
        tr: "E-posta",
      }),
      profileForm: {
        avatar: t({
          en: "Avatar",
          tr: "Avatar",
        }),
        bio: t({
          en: "Bio",
          tr: "Biyografi",
        }),
        displayName: t({
          en: "Display Name",
          tr: "Görünen İsim",
        }),
        submit: t({
          en: "Update Profile",
          tr: "Profili Güncelle",
        }),
      },
      submit: t({
        en: "Update User",
        tr: "Kullanıcıyı Güncelle",
      }),
      username: t({
        en: "Username",
        tr: "Kullanıcı Adı",
      }),
    },
  },
  key: "dashboard.account",
} satisfies Dictionary;
