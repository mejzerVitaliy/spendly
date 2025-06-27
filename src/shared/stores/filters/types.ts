import { Currency, TransactionCategory, TransactionType } from "@/shared/types";

interface FiltersState {
  type: TransactionType | '';
  categories: TransactionCategory[] | [''];
  currencies: Currency[] | [''];
  search: string;

  setType: (type: TransactionType | '') => void;
  setCategories: (categories: TransactionCategory[] | ['']) => void;
  setCurrencies: (currencies: Currency[] | ['']) => void;
  setSearch: (search: string) => void;

}

export type { FiltersState };