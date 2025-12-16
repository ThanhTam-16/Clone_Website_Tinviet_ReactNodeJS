import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from '../../../stores/auth.store' 

export default function AuthModal({ open, onClose, initialTab = 'login' }) {
  const [tab, setTab] = useState(initialTab)

  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' })
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const login = useAuthStore((s) => s.login)
  const register = useAuthStore((s) => s.register)
  const isLoading = useAuthStore((s) => s.isAuthLoading)
  const authError = useAuthStore((s) => s.authError)

  useEffect(() => {
    if (open) setTab(initialTab)
  }, [open, initialTab])

  const title = useMemo(() => (tab === 'login' ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'), [tab])

  if (!open) return null

  const submitLogin = async (e) => {
    e.preventDefault()
    const ok = await login(loginForm)
    if (ok) onClose?.()
  }

  const submitRegister = async (e) => {
    e.preventDefault()
    if (regForm.password !== regForm.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp')
      return
    }
    const ok = await register({
      fullName: regForm.fullName,
      email: regForm.email || null,
      phone: regForm.phone || null,
      password: regForm.password,
    })
    if (ok) onClose?.()
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--brand)]'

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* QUAN TRỌNG: text-gray-900 để không bị kế thừa text-white từ TopNav */}
      <div className="absolute left-1/2 top-1/2 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white p-5 text-gray-900 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold">{title}</h2>
          <button onClick={onClose} className="rounded-md px-2 py-1 text-sm hover:bg-gray-100">
            ✕
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold ${
              tab === 'login' ? 'bg-[var(--brand)] text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-semibold ${
              tab === 'register' ? 'bg-[var(--brand)] text-white' : 'bg-gray-100 text-gray-800'
            }`}
          >
            Đăng ký
          </button>
        </div>

        {authError ? (
          <div className="mt-3 rounded-md border border-red-200 bg-red-50 p-2 text-sm text-red-700">
            {authError}
          </div>
        ) : null}

        {tab === 'login' ? (
          <form onSubmit={submitLogin} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Email hoặc SĐT</label>
              <input
                className={inputClass}
                value={loginForm.identifier}
                onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                placeholder="vd: a@gmail.com hoặc 0909xxxxxx"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
              <input
                className={inputClass}
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
            </div>

            <button
              disabled={isLoading}
              className="mt-1 w-full rounded-md bg-[var(--brand)] py-2 font-semibold text-white disabled:opacity-60"
              type="submit"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
            </button>
          </form>
        ) : (
          <form onSubmit={submitRegister} className="mt-4 space-y-3">
            <div>
              <label className="mb-1 block text-sm font-medium">Họ tên</label>
              <input
                className={inputClass}
                value={regForm.fullName}
                onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium">Email (tuỳ chọn)</label>
                <input
                  className={inputClass}
                  type="email"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">SĐT (tuỳ chọn)</label>
                <input
                  className={inputClass}
                  value={regForm.phone}
                  onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
              <input
                className={inputClass}
                type="password"
                value={regForm.password}
                onChange={(e) => setRegForm({ ...regForm, password: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">Nhập lại mật khẩu</label>
              <input
                className={inputClass}
                type="password"
                value={regForm.confirmPassword}
                onChange={(e) => setRegForm({ ...regForm, confirmPassword: e.target.value })}
                required
              />
            </div>

            <button
              disabled={isLoading}
              className="mt-1 w-full rounded-md bg-[var(--brand)] py-2 font-semibold text-white disabled:opacity-60"
              type="submit"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng ký'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
