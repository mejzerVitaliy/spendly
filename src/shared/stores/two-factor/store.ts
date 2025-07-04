import { create } from 'zustand'
import { TwoFactorStore } from './types'

const useTwoFactorStore = create<TwoFactorStore>((set) => ({
  email: null,
  
  setEmail: (email: string) => {
    set({ email })
  },
  
  clearEmail: () => {
    set({ email: null })
  }
}))

export { useTwoFactorStore } 