import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarStore {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarStore>()(
  persist(
    (set) => ({
      isSidebarOpen: false,
      setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    { name: "sidebar-state" }
  )
);
