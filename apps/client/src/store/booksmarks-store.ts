import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BooksmarksStore {
  addBookmark: (postId: string) => void;
  bookmarks: string[];
  isBookmarked: (postId: string) => boolean;
  removeBookmark: (postId: string) => void;
}

export const useBooksmarksStore = create<BooksmarksStore>()(
  persist(
    (set, get) => ({
      addBookmark: (postId: string) =>
        set((state) => ({
          bookmarks: Array.from(new Set([postId, ...state.bookmarks])),
        })),
      bookmarks: [],
      isBookmarked: (postId: string) => get().bookmarks.includes(postId),
      removeBookmark: (postId: string) =>
        set((state) => ({
          bookmarks: state.bookmarks.filter((id) => id !== postId),
        })),
    }),
    { name: "bookmarks-state" }
  )
);
