import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    createSubtitle: t({
      en: "Fill in the details to create a new translation",
      tr: "Yeni bir çeviri oluşturmak için detayları doldurun",
    }),
    createTitle: t({
      en: "Create Translation",
      tr: "Çeviri Oluştur",
    }),
    editSubtitle: t({
      en: "Make changes to your translation",
      tr: "Çevirinizde değişiklik yapın",
    }),
    editTitle: t({
      en: "Edit Translation",
      tr: "Çeviriyi Düzenle",
    }),
    inputs: {
      content: t({
        en: "Translation Content",
        tr: "Çeviri İçeriği",
      }),
      description: t({
        en: "Translation Description",
        tr: "Çeviri Açıklaması",
      }),
      isPublished: t({
        en: "Is Published",
        tr: "Yayınlandı mı",
      }),
      keywords: t({
        en: "Keywords",
        tr: "Anahtar Kelimeler",
      }),
      locale: t({
        en: "Locale",
        tr: "Yerel Ayar",
      }),
      post: t({
        en: "Post",
        tr: "Gönderi",
      }),
      submit: t({
        en: "Update Translation",
        tr: "Çeviriyi Güncelle",
      }),
      title: t({
        en: "Translation Title",
        tr: "Çeviri Başlığı",
      }),
    },
    onDelete: {
      confirm: t({
        en: "Are you sure you want to delete this translation? This action cannot be undone.",
        tr: "Bu çeviriyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      }),
      label: t({
        en: "Delete Translation",
        tr: "Çeviriyi Sil",
      }),
      success: t({
        en: "Translation deleted successfully.",
        tr: "Çeviri başarıyla silindi.",
      }),
    },
    success: t({
      en: "Translation updated successfully.",
      tr: "Çeviri başarıyla güncellendi.",
    }),
  },
  key: "dashboard.translations.edit",
} satisfies Dictionary;
