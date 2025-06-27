export interface AppearanceState {
  transactionView: 'row' | 'grid'
  setTransactionView: (view: 'row' | 'grid') => void;
}