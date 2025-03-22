import {create} from 'zustand'
import { AuthStore } from './types'

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,

  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem('authTokens', JSON.stringify({ accessToken, refreshToken }));

    set({ accessToken, refreshToken });
  },

}))

if (typeof window !== "undefined") {
  const {storedAccessToken, storedRefreshToken} = 
    JSON.parse(localStorage.getItem("authTokens") as string) ||
    {storedAccessToken: null, storedRefreshToken: null}

  if (storedAccessToken && storedRefreshToken) {
    useAuthStore.setState({ accessToken: storedAccessToken, refreshToken: storedRefreshToken });
  }
}

export { useAuthStore }