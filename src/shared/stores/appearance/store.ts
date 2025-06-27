import { create } from "zustand";
import { AppearanceState } from "./types";

export const useAppearanceStore = create<AppearanceState>((set) => ({
  transactionView: 'row',
  setTransactionView: (view: 'row' | 'grid') => set({ transactionView: view }),
}))
