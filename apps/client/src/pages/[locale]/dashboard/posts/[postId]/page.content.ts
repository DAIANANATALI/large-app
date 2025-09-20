import type { Dictionary } from "intlayer";

import { t } from "intlayer";

export default {
  content: {
    createSubtitle: t({
      en: "Fill in the details to create a new post",
      tr: "Yeni bir gönderi oluşturmak için detayları doldurun",
    }),
    createTitle: t({
      en: "Create Post",
      tr: "Gönderi Oluştur",
    }),
    deleteButton: {
      confirm: t({
        en: "Are you sure you want to delete this post? This action cannot be undone.",
        tr: "Bu gönderiyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      }),
      label: t({
        en: "Delete Post",
        tr: "Gönderiyi Sil",
      }),
      success: t({
        en: "Post deleted successfully.",
        tr: "Gönderi başarıyla silindi.",
      }),
    },
    editSubtitle: t({
      en: "Make changes to your post",
      tr: "Gönderinizde değişiklik yapın",
    }),
    editTitle: t({
      en: "Edit Post",
      tr: "Gönderiyi Düzenle",
    }),
    inputs: {
      description: t({
        en: "Description",
        tr: "Açıklama",
      }),
      isPublished: t({
        en: "Is Published",
        tr: "Yayınlandı mı",
      }),
      submit: t({
        en: "Update Post",
        tr: "Gönderiyi Güncelle",
      }),
      title: t({
        en: "Title",
        tr: "Başlık",
      }),
    },
    success: t({
      en: "Post updated successfully.",
      tr: "Gönderi başarıyla güncellendi.",
    }),
  },
  key: "dashboard.posts.postId",
} satisfies Dictionary;
