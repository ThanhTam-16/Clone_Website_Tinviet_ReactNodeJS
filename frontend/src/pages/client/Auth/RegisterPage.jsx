import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp')
      return
    }
    // TODO: call register API
    console.log(form)
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border bg-white p-6">
      <h1 className="text-xl font-bold text-center">ĐĂNG KÝ</h1>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Họ tên</label>
          <input
            name="name"
            className="w-full rounded-md border px-3 py-2"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-md border px-3 py-2"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            name="password"
            className="w-full rounded-md border px-3 py-2"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Nhập lại mật khẩu</label>
          <input
            type="password"
            name="confirmPassword"
            className="w-full rounded-md border px-3 py-2"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-[var(--brand)] py-2 font-semibold text-white"
        >
          Đăng ký
        </button>
      </form>

      <div className="mt-4 text-center text-sm">
        Đã có tài khoản?{' '}
        <Link to="/dang-nhap" className="font-semibold text-[var(--brand)] hover:underline">
          Đăng nhập
        </Link>
      </div>
    </div>
  )
}
