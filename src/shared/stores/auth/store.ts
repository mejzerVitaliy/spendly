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
  const storedTokens = localStorage.getItem("authTokens");
  
  if (storedTokens) {
    try {
      const { accessToken, refreshToken } = JSON.parse(storedTokens);
      if (accessToken && refreshToken) {
        useAuthStore.setState({ accessToken, refreshToken });
      }
    } catch (e) {
      console.error("Error parsing auth tokens", e);
    }
  }
}


export { useAuthStore }