import { NavLink } from 'react-router-dom'
import { FiHome, FiBox, FiList, FiUsers } from 'react-icons/fi'

const nav = [
  { to: '/admin', label: 'Dashboard', icon: <FiHome /> },
  { to: '/admin/products', label: 'Sản phẩm', icon: <FiBox /> },
  { to: '/admin/categories', label: 'Danh mục', icon: <FiList /> },
  { to: '/admin/users', label: 'Khách hàng', icon: <FiUsers /> },
]

export default function AdminSidebar() {
  return (
    <aside className="w-56 border-r bg-white">
      <div className="border-b px-4 py-3 text-sm font-bold">
        ADMIN PANEL
      </div>

      <nav className="p-2 space-y-1 text-sm">
        {nav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-md px-3 py-2 ${
                isActive
                  ? 'bg-[var(--brand)] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {n.icon}
            {n.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
