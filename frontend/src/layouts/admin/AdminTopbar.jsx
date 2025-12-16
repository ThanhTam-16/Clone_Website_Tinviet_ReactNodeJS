import { useAuthStore } from '../../stores/auth.store'

export default function AdminTopbar() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  return (
    <header className="flex items-center justify-between border-b bg-white px-4 py-2 text-sm">
      <div className="font-semibold">Quản trị hệ thống</div>

      <div className="flex items-center gap-3">
        <span>{user?.full_name || user?.name}</span>
        <button
          onClick={logout}
          className="rounded-md border px-3 py-1 hover:bg-gray-50"
        >
          Đăng xuất
        </button>
      </div>
    </header>
  )
}
