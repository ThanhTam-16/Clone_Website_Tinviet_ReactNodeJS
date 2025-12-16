import { api } from './api'

export const categoryService = {
  getTree: async () => {
    const res = await api.get('/categories/tree', { params: { type: 'product' } })
    return res.data
  },
}
