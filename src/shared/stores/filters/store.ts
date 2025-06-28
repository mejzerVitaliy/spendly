import { create } from "zustand";
import { FiltersState } from "./types";

const useFilterStore = create<FiltersState>((set) => ({
  type: '',
  categories: [''],
  currencies: [''],
  search: '',
  date: undefined,

  setType: (type) => set({type}),
  setCategories: (categories) => set({categories}),
  setCurrencies: (currencies) => set({currencies}),
  setSearch: (search) => set({ search }),
  setDate: (date) => set({ date }),
}));

export { useFilterStore };