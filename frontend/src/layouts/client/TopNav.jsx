import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../stores/auth.store'
import AuthModal from '../../pages/client/Auth/AuthModal'

export default function TopNav() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const [openAuth, setOpenAuth] = useState(false)
  const navigate = useNavigate()

  // auto chuyển admin sau khi login (khi store có role)
  useEffect(() => {
    if (user?.role === 'admin') {
      setOpenAuth(false)
      navigate('/admin', { replace: true })
    }
  }, [user?.role, navigate])

  return (
    <div className="bg-[var(--brand)] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-2 text-sm">
        <nav className="flex items-center gap-4">
          <Link className="hover:underline" to="/">TRANG CHỦ</Link>
          <Link className="hover:underline" to="/gioi-thieu">GIỚI THIỆU</Link>
          <Link className="hover:underline" to="/danh-muc/may-photocopy">CHO THUÊ MÁY PHOTOCOPY-IN-SCAN</Link>
          <Link className="hover:underline" to="/danh-muc/may-in">SỬA CHỮA-NẠP MỰC MÁY IN</Link>
          <Link className="hover:underline" to="/lien-he">LIÊN HỆ</Link>

          {user?.role === 'admin' && (
            <Link className="hover:underline" to="/admin">ADMIN</Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/tai-khoan/don-hang" className="hover:underline">
                Xin chào, {user.full_name || user.email || user.phone || 'User'}
              </Link>
              <button
                onClick={logout}
                className="rounded-md bg-white/15 px-3 py-1 hover:bg-white/25"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <button
              onClick={() => setOpenAuth(true)}
              className="rounded-md bg-white/15 px-3 py-1 hover:bg-white/25"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>

      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} initialTab="login" />
    </div>
  )
}
