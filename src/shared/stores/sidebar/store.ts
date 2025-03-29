import { create } from "zustand";
import { SidebarState } from "./types";

const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  toggleOpen: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
}));

export { useSidebarStore };