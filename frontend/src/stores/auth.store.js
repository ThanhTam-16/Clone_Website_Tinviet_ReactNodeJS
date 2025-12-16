import { create } from 'zustand'
import { authService } from '../services/auth.service'

const setTokens = (accessToken, refreshToken) => {
  if (accessToken) localStorage.setItem('accessToken', accessToken)
  else localStorage.removeItem('accessToken')

  if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
  else localStorage.removeItem('refreshToken')
}

export const useAuthStore = create((set, get) => ({
  user: null,
  isAuthLoading: false,
  authError: null,

  fetchMe: async () => {
    try {
      const user = await authService.me()
      set({ user })
      return user
    } catch {
      set({ user: null })
      return null
    }
  },

  login: async ({ identifier, password }) => {
    set({ isAuthLoading: true, authError: null })
    try {
      const data = await authService.login({ identifier, password })
      setTokens(data.accessToken, data.refreshToken)

      // IMPORTANT: lấy user đầy đủ (có role) từ /auth/me
      const me = await get().fetchMe()

      set({ user: me, isAuthLoading: false })
      return true
    } catch (e) {
      set({
        isAuthLoading: false,
        authError: e?.response?.data?.message || 'Đăng nhập thất bại',
      })
      return false
    }
  },

  register: async ({ fullName, email, phone, password }) => {
    set({ isAuthLoading: true, authError: null })
    try {
      await authService.register({ fullName, email, phone, password })
      set({ isAuthLoading: false })

      const identifier = email || phone
      if (identifier) return await get().login({ identifier, password })
      return true
    } catch (e) {
      set({
        isAuthLoading: false,
        authError: e?.response?.data?.message || 'Đăng ký thất bại',
      })
      return false
    }
  },

  logout: () => {
    setTokens(null, null)
    set({ user: null })
  },
}))
