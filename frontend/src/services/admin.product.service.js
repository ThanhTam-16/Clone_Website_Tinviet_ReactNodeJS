import { api } from "./api";

export const adminProductService = {
  // list dùng public endpoint (đã có)
  list: async ({ page = 1, limit = 50, q = "" } = {}) => {
    const res = await api.get("/products", { params: { page, limit, q } });
    return res.data; // { items, total, page, limit } (tuỳ backend)
  },

  create: async (payload) => {
    const res = await api.post("/admin/products", payload);
    return res.data; // { message, id }
  },

  update: async (id, payload) => {
    const res = await api.put(`/admin/products/${id}`, payload);
    return res.data;
  },

  remove: async (id) => {
    const res = await api.delete(`/admin/products/${id}`);
    return res.data;
  },
};
