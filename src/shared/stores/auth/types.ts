interface AuthStore {
  accessToken: string | null
  refreshToken: string | null
  isAuthenticated: boolean

  setTokens: (accessToken: string, refreshToken: string) => void
  validateAndUpdateTokens: () => boolean
}

export type { AuthStore }