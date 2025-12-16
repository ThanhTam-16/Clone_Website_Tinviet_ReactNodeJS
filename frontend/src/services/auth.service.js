import { api } from './api'

export const authService = {
  login: async ({ identifier, password }) => {
    const res = await api.post('/auth/login', { identifier, password })
    return res.data
  },

  register: async ({ fullName, email, phone, password }) => {
    const res = await api.post('/auth/register', { fullName, email, phone, password })
    return res.data
  },

  me: async () => {
    const res = await api.get('/auth/me')
    return res.data // backend trả thẳng user :contentReference[oaicite:6]{index=6}
  },

  refresh: async ({ refreshToken }) => {
    const res = await api.post('/auth/refresh', { refreshToken })
    return res.data
  },
}
