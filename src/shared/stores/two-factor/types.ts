interface TwoFactorStore {
  email: string | null
  setEmail: (email: string) => void
  clearEmail: () => void
}

export type { TwoFactorStore } 