import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  // tạm thời FE chỉ hiển thị count local
  items: [], // [{productId, qty}]
  count: 0,

  setFromServer(cart) {
    const items = cart?.items || []
    const count = items.reduce((s, i) => s + (i.quantity || 0), 0)
    set({ items, count })
  },

  addLocal(productId, qty = 1) {
    const items = [...get().items]
    const idx = items.findIndex((x) => x.productId === productId)
    if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + qty }
    else items.push({ productId, qty })
    const count = items.reduce((s, i) => s + i.qty, 0)
    set({ items, count })
  },
}))
