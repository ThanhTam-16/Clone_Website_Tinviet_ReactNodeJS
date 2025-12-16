import { useMemo } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import CategorySidebar from '../Home/components/CategorySidebar'
import { categoryService } from '../../../services/category.service'
import { productService } from '../../../services/product.service'
import { formatPriceVND } from '../../../utils/format'

function flattenTree(tree = []) {
  const out = []
  const walk = (nodes) => {
    for (const n of nodes || []) {
      out.push(n)
      if (n.children?.length) walk(n.children)
    }
  }
  walk(tree)
  return out
}

export default function CategoryProductsPage() {
  const { idOrSlug } = useParams()
  const [sp, setSp] = useSearchParams()

  const page = Math.max(1, Number(sp.get('page') || 1))
  const limit = Math.min(24, Math.max(6, Number(sp.get('limit') || 12)))

  // 1) Lấy cây danh mục để render sidebar + tìm name/id theo slug
  const { data: treeData, isLoading: catLoading } = useQuery({
    queryKey: ['categories-tree', 'product'],
    queryFn: () => categoryService.getTree(),
  })

  const tree = treeData?.tree || treeData || []
  const flat = useMemo(() => flattenTree(tree), [tree])

  const isNumeric = /^\d+$/.test(String(idOrSlug || ''))
  const currentCategory = useMemo(() => {
    if (!idOrSlug) return null
    if (isNumeric) return flat.find((c) => Number(c.id) === Number(idOrSlug)) || null
    return flat.find((c) => c.slug === idOrSlug) || null
  }, [flat, idOrSlug, isNumeric])

  const categoryId = isNumeric ? Number(idOrSlug) : currentCategory?.id
  const categoryName = currentCategory?.name || (isNumeric ? `Danh mục #${idOrSlug}` : `Danh mục: ${idOrSlug}`)

  // 2) Lấy sản phẩm theo categoryId (đúng với backend bạn đang test)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['category-products', categoryId, page, limit],
    queryFn: () => productService.list({ categoryId, page, limit }),
    enabled: !!categoryId,
  })

  const items = data?.items || []
  const pagination = data?.pagination || {}
  const totalPages = Math.max(1, Number(pagination.total_pages || pagination.totalPages || 1))

  const goPage = (nextPage) => {
    const p = Math.min(totalPages, Math.max(1, nextPage))
    sp.set('page', String(p))
    sp.set('limit', String(limit))
    setSp(sp, { replace: true })
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar danh mục */}
      <aside className="col-span-12 lg:col-span-3">
        <CategorySidebar tree={tree} />
      </aside>

      {/* Main */}
      <section className="col-span-12 lg:col-span-9 space-y-4">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{categoryName}</span>
        </div>

        {/* Header */}
        <div className="rounded-lg border bg-white px-4 py-3 flex items-center justify-between">
          <h1 className="text-sm font-bold uppercase">{categoryName}</h1>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Hiển thị</span>
            <select
              className="rounded-md border px-2 py-1"
              value={limit}
              onChange={(e) => {
                sp.set('limit', e.target.value)
                sp.set('page', '1')
                setSp(sp, { replace: true })
              }}
            >
              {[6, 12, 18, 24].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="text-gray-600">/ trang</span>
          </div>
        </div>

        {/* List */}
        <div className="rounded-lg border bg-white p-4">
          {catLoading ? (
            <div className="text-sm text-gray-600">Đang tải danh mục...</div>
          ) : !categoryId ? (
            <div className="text-sm text-gray-600">Không tìm thấy danh mục.</div>
          ) : isLoading ? (
            <div className="text-sm text-gray-600">Đang tải sản phẩm...</div>
          ) : isError ? (
            <div className="text-sm text-red-600">Lỗi tải sản phẩm.</div>
          ) : items.length === 0 ? (
            <div className="text-sm text-gray-600">Chưa có sản phẩm.</div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <Link
                  key={p.id}
                  to={`/san-pham/${p.slug}`}
                  className="group rounded-lg border bg-white p-2 hover:shadow-sm"
                >
                  <div className="aspect-square overflow-hidden rounded-md bg-gray-50">
                    <img
                      src={p.featured_image_url || '/vite.svg'}
                      alt={p.name}
                      className="h-full w-full object-contain transition group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-2 line-clamp-2 min-h-[36px] text-xs font-medium text-gray-900">
                    {p.name}
                  </div>

                  <div className="mt-1 text-sm font-bold text-[var(--brand)]">
                    {formatPriceVND(p.price)}
                  </div>

                  {p.compare_at_price ? (
                    <div className="text-xs text-gray-400 line-through">
                      {formatPriceVND(p.compare_at_price)}
                    </div>
                  ) : null}
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="mt-5 flex items-center justify-between">
            <button
              className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
              onClick={() => goPage(page - 1)}
              disabled={page <= 1}
            >
              ← Trang trước
            </button>

            <div className="text-sm text-gray-700">
              Trang <b>{page}</b> / <b>{totalPages}</b>
            </div>

            <button
              className="rounded-md border px-3 py-2 text-sm disabled:opacity-50"
              onClick={() => goPage(page + 1)}
              disabled={page >= totalPages}
            >
              Trang sau →
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
