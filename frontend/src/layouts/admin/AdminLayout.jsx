import { Link, NavLink, Outlet } from "react-router-dom";
import { useAuthStore } from "../../stores/auth.store";
import { FiGrid, FiBox, FiList, FiUsers, FiLogOut } from "react-icons/fi";

const navItemClass = ({ isActive }) =>
  `flex items-center gap-2 rounded-md px-3 py-2 text-sm ${
    isActive ? "bg-red-600 text-white" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function AdminLayout() {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-semibold text-red-700">
            TinViet Admin
          </Link>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-600">
              {user?.full_name || user?.email || "Admin"}
            </span>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-md bg-slate-900 px-3 py-2 text-white hover:opacity-90"
            >
              <FiLogOut /> Đăng xuất
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 px-4 py-4">
        <aside className="col-span-12 rounded-lg bg-white p-3 shadow-sm md:col-span-3 lg:col-span-2">
          <nav className="space-y-1">
            <NavLink to="/admin" end className={navItemClass}>
              <FiGrid /> Dashboard
            </NavLink>
            <NavLink to="/admin/products" className={navItemClass}>
              <FiBox /> Sản phẩm
            </NavLink>
            <NavLink to="/admin/categories" className={navItemClass}>
            <FiList /> Danh mục
            </NavLink>

            <NavLink to="/admin/users" className={navItemClass}>
            <FiUsers /> Khách hàng
            </NavLink>
          </nav>
        </aside>

        <main className="col-span-12 rounded-lg bg-white p-4 shadow-sm md:col-span-9 lg:col-span-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
