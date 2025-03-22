interface AuthStore {
  accessToken: string | null
  refreshToken: string | null

  setTokens: (accessToken: string, refreshToken: string) => void;
}

export type { AuthStore }