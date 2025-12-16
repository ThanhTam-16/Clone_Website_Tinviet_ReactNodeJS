import { api } from "./api";

export const adminDashboardService = {
  async getCounts() {
    const [productsRes, categoriesRes, usersRes] = await Promise.all([
      api.get("/products", { params: { page: 1, limit: 9999 } }),
      api.get("/admin/categories", { params: { page: 1, limit: 9999, type: "product" } }),
      api.get("/admin/users", { params: { page: 1, limit: 9999 } }),
    ]);

    return {
      products: (productsRes.data?.items ?? []).length,
      categories: (categoriesRes.data?.items ?? []).length,
      users: (usersRes.data?.items ?? []).length,
    };
  },
};
