import { api } from "./api";

export const adminCategoryService = {
  list: async (params) => {
    const res = await api.get("/admin/categories", { params });
    return res.data; // { items, pagination }
  },
  create: async (payload) => {
    const res = await api.post("/admin/categories", payload);
    return res.data;
  },
  update: async (id, payload) => {
    const res = await api.put(`/admin/categories/${id}`, payload);
    return res.data;
  },
  remove: async (id) => {
    const res = await api.delete(`/admin/categories/${id}`);
    return res.data;
  },
};
