import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminUserService } from '../../../services/admin.user.service'

export default function AdminUserPage() {
  const qc = useQueryClient()
  const [q, setQ] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-users', q, role, status],
    queryFn: () => adminUserService.list({ q, role, status, page: 1, limit: 200 }),
  })

  const items = data?.items || []

  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => adminUserService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-users'] }),
  })

  return (
    <div className="space-y-4">
      <h1 className="text-lg font-bold">Quản lý tài khoản khách hàng</h1>

      <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-white p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm theo tên/email/phone..."
          className="w-full md:w-[360px] rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
          <option value="">Tất cả role</option>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
          <option value="staff">staff</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-md border px-3 py-2 text-sm">
          <option value="">Tất cả trạng thái</option>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
          <option value="blocked">blocked</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <div className="grid grid-cols-12 border-b bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
          <div className="col-span-3">Họ tên</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Phone</div>
          <div className="col-span-1">Role</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-right">Lưu</div>
        </div>

        {isLoading ? (
          <div className="p-3 text-sm text-gray-600">Đang tải...</div>
        ) : isError ? (
          <div className="p-3 text-sm text-red-600">Lỗi tải users</div>
        ) : items.length === 0 ? (
          <div className="p-3 text-sm text-gray-600">Chưa có user</div>
        ) : (
          items.map((u) => (
            <UserRow key={u.id} u={u} onSave={(payload) => updateMut.mutate({ id: u.id, payload })} />
          ))
        )}
      </div>
    </div>
  )
}

function UserRow({ u, onSave }) {
  const [role, setRole] = useState(u.role)
  const [status, setStatus] = useState(u.status)

  return (
    <div className="grid grid-cols-12 items-center border-b px-3 py-2 text-sm">
      <div className="col-span-3 font-medium">{u.full_name}</div>
      <div className="col-span-3 text-gray-700">{u.email || '-'}</div>
      <div className="col-span-2 text-gray-700">{u.phone || '-'}</div>

      <div className="col-span-1">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full rounded-md border px-2 py-1 text-sm">
          <option value="customer">customer</option>
          <option value="admin">admin</option>
          <option value="staff">staff</option>
        </select>
      </div>

      <div className="col-span-2">
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-md border px-2 py-1 text-sm">
          <option value="active">active</option>
          <option value="inactive">inactive</option>
          <option value="blocked">blocked</option>
        </select>
      </div>

      <div className="col-span-1 flex justify-end">
        <button
          onClick={() => onSave({ role, status })}
          className="rounded-md bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
        >
          Lưu
        </button>
      </div>
    </div>
  )
}
