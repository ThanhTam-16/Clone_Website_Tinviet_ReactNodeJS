import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: call auth API
    console.log({ email, password })
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="text-xl font-bold text-center">ĐĂNG NHẬP</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-md border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            className="w-full rounded-md border px-3 py-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-[var(--brand)] py-2 font-semibold text-white"
        >
          Đăng nhập
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        Chưa có tài khoản?{' '}
        <Link to="/dang-ky" className="font-semibold text-[var(--brand)] hover:underline">
          Đăng ký
        </Link>
      </div>
    </div>
  )
}
