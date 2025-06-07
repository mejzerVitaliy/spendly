import { create } from 'zustand'
import { AuthStore } from './types'
import { jwtDecode } from 'jwt-decode'

const validateToken = (token: string | null): boolean => {
  if (!token) return false
  try {
    const decoded = jwtDecode(token)
    return decoded.exp ? decoded.exp * 1000 > Date.now() : false
  } catch {
    return false
  }
}

const useAuthStore = create<AuthStore>((set) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,

  setTokens: (accessToken: string, refreshToken: string) => {
    if (accessToken && refreshToken) {
      localStorage.setItem('authTokens', JSON.stringify({ accessToken, refreshToken }))
      set({ accessToken, refreshToken, isAuthenticated: true })
    } else {
      localStorage.removeItem('authTokens')
      set({ accessToken: null, refreshToken: null, isAuthenticated: false })
    }
  },

  validateAndUpdateTokens: () => {
    const storedTokens = localStorage.getItem('authTokens')
    if (!storedTokens) {
      set({ accessToken: null, refreshToken: null, isAuthenticated: false })
      return false
    }

    try {
      const { accessToken, refreshToken } = JSON.parse(storedTokens)
      const isAccessTokenValid = validateToken(accessToken)
      const isRefreshTokenValid = validateToken(refreshToken)

      if (!isAccessTokenValid || !isRefreshTokenValid) {
        localStorage.removeItem('authTokens')
        set({ accessToken: null, refreshToken: null, isAuthenticated: false })
        return false
      }

      set({ accessToken, refreshToken, isAuthenticated: true })
      return true
    } catch (e) {
      console.error('Error validating tokens:', e)
      localStorage.removeItem('authTokens')
      set({ accessToken: null, refreshToken: null, isAuthenticated: false })
      return false
    }
  }
}))

// Initialize store with tokens from localStorage
if (typeof window !== 'undefined') {
  useAuthStore.getState().validateAndUpdateTokens()
}

export { useAuthStore }