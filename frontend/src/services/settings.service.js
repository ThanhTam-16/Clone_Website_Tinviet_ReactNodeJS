import { api } from './api'

export const settingsService = {
  getAll: async () => {
    const res = await api.get('/settings')
    return res.data
  },
}
