import axios from 'axios'
import { authService } from './auth.service'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15000,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

let isRefreshing = false
let queue = []

const processQueue = (error, token = null) => {
  queue.forEach((p) => (error ? p.reject(error) : p.resolve(token)))
  queue = []
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    if (error?.response?.status !== 401 || original?._retry) {
      throw error
    }

    original._retry = true
    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) throw error

    if (isRefreshing) {
      const newToken = await new Promise((resolve, reject) => queue.push({ resolve, reject }))
      original.headers.Authorization = `Bearer ${newToken}`
      return api(original)
    }

    isRefreshing = true
    try {
      const data = await authService.refresh({ refreshToken }) // backend có endpoint này :contentReference[oaicite:10]{index=10}
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      processQueue(null, data.accessToken)

      original.headers.Authorization = `Bearer ${data.accessToken}`
      return api(original)
    } catch (e) {
      processQueue(e, null)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      throw e
    } finally {
      isRefreshing = false
    }
  }
)
