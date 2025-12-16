import { api } from './api'

export const adminUserService = {
  list: async (params) => {
    const res = await api.get('/admin/users', { params })
    return res.data
  },
  update: async (id, payload) => {
    const res = await api.put(`/admin/users/${id}`, payload)
    return res.data
  },
}
