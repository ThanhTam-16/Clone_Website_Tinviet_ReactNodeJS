import { api } from './api'

function normalizeProduct(payload) {
  // payload là res.data
  return (
    payload?.item ||
    payload?.data ||
    payload?.product ||
    payload?.result ||
    payload
  )
}

export const productService = {
  list: async (params) => {
    const res = await api.get('/products', { params })
    return res.data // {items, pagination}
  },

  getBySlug: async (slug) => {
    const res = await api.get(`/products/${slug}`)
    return normalizeProduct(res.data)
  },
}
