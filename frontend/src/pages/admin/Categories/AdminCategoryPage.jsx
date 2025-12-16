import { useMemo, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { adminCategoryService } from '../../../services/admin.category.service'

const emptyForm = {
  parent_id: null,
  type: 'product',
  name: '',
  slug: '',
  description: '',
  image_url: '',
  sort_order: 0,
  is_active: 1,
}

export default function AdminCategoryPage() {
  const qc = useQueryClient()
  const [q, setQ] = useState('')
  const [isActive, setIsActive] = useState('')
  const [editing, setEditing] = useState(null) // category object
  const [form, setForm] = useState(emptyForm)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin-categories', q, isActive],
    queryFn: () => adminCategoryService.list({ q, type: 'product', isActive, page: 1, limit: 200 }),
  })

  const items = data?.items || []

  const parents = useMemo(() => {
    // chỉ cho chọn parent trong cùng type=product
    return items.map((c) => ({ id: c.id, name: c.name }))
  }, [items])

  const createMut = useMutation({
    mutationFn: (payload) => adminCategoryService.create(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  })

  const updateMut = useMutation({
    mutationFn: ({ id, payload }) => adminCategoryService.update(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  })

  const deleteMut = useMutation({
    mutationFn: (id) => adminCategoryService.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['admin-categories'] }),
  })

  const openCreate = () => {
    setEditing(null)
    setForm({ ...emptyForm })
  }

  const openEdit = (cat) => {
    setEditing(cat)
    setForm({
      parent_id: cat.parent_id ?? null,
      type: cat.type || 'product',
      name: cat.name || '',
      slug: cat.slug || '',
      description: cat.description || '',
      image_url: cat.image_url || '',
      sort_order: cat.sort_order || 0,
      is_active: cat.is_active ? 1 : 0,
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    const payload = {
      ...form,
      parent_id: form.parent_id ? Number(form.parent_id) : null,
      sort_order: Number(form.sort_order) || 0,
      is_active: Number(form.is_active) ? 1 : 0,
    }

    if (editing?.id) {
      await updateMut.mutateAsync({ id: editing.id, payload })
    } else {
      await createMut.mutateAsync(payload)
    }
    openCreate()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Quản lý danh mục</h1>
        <button
          onClick={openCreate}
          className="rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          + Thêm danh mục
        </button>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2 rounded-lg border bg-white p-3">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Tìm theo tên/slug..."
              className="w-full md:w-[320px] rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--brand)]"
            />
            <select
              value={isActive}
              onChange={(e) => setIsActive(e.target.value)}
              className="rounded-md border px-3 py-2 text-sm"
            >
              <option value="">Tất cả trạng thái</option>
              <option value="1">Đang active</option>
              <option value="0">Đã tắt</option>
            </select>
          </div>

          <div className="overflow-hidden rounded-lg border bg-white">
            <div className="grid grid-cols-12 border-b bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
              <div className="col-span-4">Tên</div>
              <div className="col-span-3">Slug</div>
              <div className="col-span-2">Parent</div>
              <div className="col-span-1">Sort</div>
              <div className="col-span-1">Active</div>
              <div className="col-span-1 text-right">Hành động</div>
            </div>

            {isLoading ? (
              <div className="p-3 text-sm text-gray-600">Đang tải...</div>
            ) : isError ? (
              <div className="p-3 text-sm text-red-600">Lỗi tải danh mục</div>
            ) : items.length === 0 ? (
              <div className="p-3 text-sm text-gray-600">Chưa có danh mục</div>
            ) : (
              items.map((c) => (
                <div key={c.id} className="grid grid-cols-12 items-center border-b px-3 py-2 text-sm">
                  <div className="col-span-4 font-medium">{c.name}</div>
                  <div className="col-span-3 text-gray-600">{c.slug}</div>
                  <div className="col-span-2 text-gray-600">{c.parent_id || '-'}</div>
                  <div className="col-span-1">{c.sort_order}</div>
                  <div className="col-span-1">
                    <span className={`rounded px-2 py-1 text-xs ${c.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                      {c.is_active ? 'On' : 'Off'}
                    </span>
                  </div>
                  <div className="col-span-1 flex justify-end gap-2">
                    <button onClick={() => openEdit(c)} className="text-xs font-semibold text-blue-600 hover:underline">
                      Sửa
                    </button>
                    <button
                      onClick={() => deleteMut.mutate(c.id)}
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Tắt
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-lg border bg-white p-4">
            <div className="mb-3 text-sm font-bold">
              {editing ? `Sửa danh mục #${editing.id}` : 'Thêm danh mục'}
            </div>

            <form onSubmit={submit} className="space-y-2">
              <div>
                <label className="text-xs text-gray-600">Tên</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  required
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Slug (để trống tự tạo)</label>
                <input
                  value={form.slug}
                  onChange={(e) => setForm((s) => ({ ...s, slug: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-gray-600">Parent</label>
                  <select
                    value={form.parent_id ?? ''}
                    onChange={(e) => setForm((s) => ({ ...s, parent_id: e.target.value || null }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  >
                    <option value="">(Root)</option>
                    {parents.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-600">Sort</label>
                  <input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm((s) => ({ ...s, sort_order: e.target.value }))}
                    className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-600">Ảnh (image_url)</label>
                <input
                  value={form.image_url}
                  onChange={(e) => setForm((s) => ({ ...s, image_url: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                  placeholder="/images/categories/xxx.png"
                />
              </div>

              <div>
                <label className="text-xs text-gray-600">Mô tả</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
                  className="mt-1 w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={!!form.is_active}
                    onChange={(e) => setForm((s) => ({ ...s, is_active: e.target.checked ? 1 : 0 }))}
                  />
                  Active
                </label>

                <button
                  disabled={createMut.isPending || updateMut.isPending}
                  className="rounded-md bg-[var(--brand)] px-3 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {editing ? 'Cập nhật' : 'Tạo mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
