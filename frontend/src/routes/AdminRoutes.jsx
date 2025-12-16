import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/admin/AdminLayout";
import DashboardPage from "../pages/admin/Dashboard/DashboardPage";
import ProductListPage from "../pages/admin/Products/ProductListPage";
import ProductFormPage from "../pages/admin/Products/ProductFormPage";
import AdminCategoryPage from "../pages/admin/Categories/AdminCategoryPage";
import AdminUserPage from "../pages/admin/Users/AdminUserPage";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="products" element={<ProductListPage />} />
        <Route path="products/new" element={<ProductFormPage mode="create" />} />
        <Route path="products/:id/:slug/edit" element={<ProductFormPage mode="edit" />} />

        <Route path="categories" element={<AdminCategoryPage />} />
        <Route path="users" element={<AdminUserPage />} />
        
        <Route path="*" element={<Navigate to="/admin" replace />} />

      </Route>
    </Routes>
  );
}
