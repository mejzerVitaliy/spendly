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
    console.log('setTokens called:', { hasAccess: !!accessToken, hasRefresh: !!refreshToken })
    if (accessToken && refreshToken) {
      localStorage.setItem('authTokens', JSON.stringify({ accessToken, refreshToken }))
      set({ accessToken, refreshToken, isAuthenticated: true })
    } else {
      console.log('Clearing tokens from localStorage')
      localStorage.removeItem('authTokens')
      set({ accessToken: null, refreshToken: null, isAuthenticated: false })
    }
  },

  validateAndUpdateTokens: () => {
    const storedTokens = localStorage.getItem('authTokens')
    console.log('validateAndUpdateTokens called, has stored tokens:', !!storedTokens)
    
    if (!storedTokens) {
      set({ accessToken: null, refreshToken: null, isAuthenticated: false })
      return false
    }

    try {
      const { accessToken, refreshToken } = JSON.parse(storedTokens)
      const isAccessTokenValid = validateToken(accessToken)
      const isRefreshTokenValid = validateToken(refreshToken)

      console.log('Token validation:', { 
        accessValid: isAccessTokenValid, 
        refreshValid: isRefreshTokenValid 
      })

      // Если refresh token невалиден - полный логаут
      if (!isRefreshTokenValid) {
        console.log('Refresh token invalid, clearing all tokens')
        localStorage.removeItem('authTokens')
        set({ accessToken: null, refreshToken: null, isAuthenticated: false })
        return false
      }

      // Если access token невалиден, но refresh валиден - НЕ удаляем токены
      // Пусть API interceptor попробует их обновить
      if (!isAccessTokenValid && isRefreshTokenValid) {
        console.log('Access token expired but refresh valid - keeping tokens for API interceptor')
        // Устанавливаем токены в store но isAuthenticated = false пока не обновятся
        set({ accessToken, refreshToken, isAuthenticated: false })
        return false // Возвращаем false чтобы PrivateRoute показал loading
      }

      // Оба токена валидны
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

if (typeof window !== 'undefined') {
  useAuthStore.getState().validateAndUpdateTokens()
}

export { useAuthStore }