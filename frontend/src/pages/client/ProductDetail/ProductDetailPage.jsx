import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { productService } from '../../../services/product.service'
import { formatPriceVND } from '../../../utils/format'

export default function ProductDetailPage() {
  const { slug } = useParams()
  const [qty, setQty] = useState(1)
  const [activeTab, setActiveTab] = useState('desc')

  const { data: product, isLoading, isError } = useQuery({
    queryKey: ['product-detail', slug],
    queryFn: () => productService.getBySlug(slug),
    enabled: !!slug,
  })

  const categoryId = product?.category_id

  const { data: sidebarData } = useQuery({
    queryKey: ['product-sidebar', categoryId, slug],
    queryFn: () => productService.list({ categoryId, limit: 8 }),
    enabled: !!categoryId,
  })

  const sidebarItems = (sidebarData?.items || []).filter((p) => p.slug !== slug).slice(0, 6)

  const mainImg = useMemo(() => {
    return product?.featured_image_url || '/images/products/placeholder.png'
  }, [product])

  const renderDescription = () => {
    const desc = product?.description
    if (!desc) return <div className="text-sm text-gray-700">Đang cập nhật mô tả.</div>

    // Nếu backend trả HTML, render HTML (giống website mẫu).
    const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(desc)
    if (looksLikeHtml) {
      return (
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )
    }

    // Nếu plain text
    return <div className="whitespace-pre-line text-sm leading-6 text-gray-800">{desc}</div>
  }

  if (isLoading) return <div className="text-sm text-gray-600">Đang tải chi tiết sản phẩm…</div>
  if (isError || !product) return <div className="text-sm text-red-600">Không tải được sản phẩm.</div>

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* MAIN */}
      <div className="col-span-12 lg:col-span-9 space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600">
          <Link to="/" className="hover:underline">Trang chủ</Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Top detail */}
        <div className="grid grid-cols-12 gap-6 rounded-lg border bg-white p-5">
          {/* Images */}
          <div className="col-span-12 md:col-span-5">
            <div className="aspect-square overflow-hidden rounded-md border bg-gray-50">
              <img src={mainImg} alt={product.name} className="h-full w-full object-contain" />
            </div>

            {/* Thumbnails (tạm) */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="aspect-square overflow-hidden rounded-md border bg-gray-50 hover:shadow-sm"
                >
                  <img src={mainImg} alt={`${product.name}-${i}`} className="h-full w-full object-contain" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="col-span-12 md:col-span-7 space-y-4">
            <h1 className="text-xl font-bold text-gray-900">{product.name}</h1>

            <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
              {product.sku ? <span>Mã hàng: <b className="text-gray-900">{product.sku}</b></span> : null}
              {typeof product.view_count === 'number' ? <span>Lượt xem: <b className="text-gray-900">{product.view_count}</b></span> : null}
              {product.status ? (
                <span>
                  Tình trạng:{' '}
                  <b className={product.status === 'published' ? 'text-green-600' : 'text-gray-900'}>
                    {product.status === 'published' ? 'Còn hàng' : product.status}
                  </b>
                </span>
              ) : null}
            </div>

            <div className="space-y-1">
              <div className="text-2xl font-extrabold text-[var(--brand)]">
                {formatPriceVND(product.price)}
              </div>
              {product.compare_at_price ? (
                <div className="text-sm text-gray-400 line-through">
                  {formatPriceVND(product.compare_at_price)}
                </div>
              ) : null}
            </div>

            <div className="flex items-center gap-3">
              <input
                value={qty}
                onChange={(e) => setQty(Math.max(1, Number(e.target.value || 1)))}
                className="w-24 rounded-md border px-3 py-2"
                type="number"
                min={1}
              />
              <button className="rounded-md bg-[var(--brand)] px-6 py-2 font-bold text-white hover:opacity-95">
                MUA NGAY
              </button>

              <div className="ml-auto text-right">
                <div className="text-sm font-semibold text-gray-700">GỌI ĐẶT MUA</div>
                <div className="text-lg font-extrabold text-[var(--brand)]">077 876 1999</div>
              </div>
            </div>

            {product.short_desc ? (
              <div className="rounded-md border bg-gray-50 p-3 text-sm text-gray-800">
                {product.short_desc}
              </div>
            ) : null}
          </div>
        </div>

        {/* Tabs */}
        <div className="rounded-lg border bg-white">
          <div className="flex flex-wrap gap-2 border-b p-3">
            <button
              className={`rounded-md px-3 py-2 text-sm font-semibold ${
                activeTab === 'desc' ? 'bg-[var(--brand)] text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setActiveTab('desc')}
            >
              Thông tin sản phẩm
            </button>

            <button
              className={`rounded-md px-3 py-2 text-sm font-semibold ${
                activeTab === 'ship' ? 'bg-[var(--brand)] text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setActiveTab('ship')}
            >
              Chính sách vận chuyển
            </button>

            <button
              className={`rounded-md px-3 py-2 text-sm font-semibold ${
                activeTab === 'warranty' ? 'bg-[var(--brand)] text-white' : 'bg-gray-100 text-gray-800'
              }`}
              onClick={() => setActiveTab('warranty')}
            >
              Điều kiện bảo hành
            </button>
          </div>

          <div className="p-5">
            {activeTab === 'desc' ? (
              renderDescription()
            ) : activeTab === 'ship' ? (
              <div className="text-sm leading-6 text-gray-800">
                Nội dung vận chuyển (bạn có thể thay bằng nội dung thật sau).
              </div>
            ) : (
              <div className="text-sm leading-6 text-gray-800">
                Nội dung bảo hành (bạn có thể thay bằng nội dung thật sau).
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="col-span-12 lg:col-span-3 space-y-4">
        <div className="rounded-lg border bg-white">
          <div className="border-b px-4 py-3 font-bold text-sm">Sản phẩm</div>
          <div className="p-3 space-y-3">
            {sidebarItems.length === 0 ? (
              <div className="text-sm text-gray-600">Chưa có sản phẩm.</div>
            ) : (
              sidebarItems.map((p) => (
                <Link key={p.id} to={`/san-pham/${p.slug}`} className="flex gap-3 hover:bg-gray-50 rounded-md p-2">
                  <div className="h-14 w-14 flex-none overflow-hidden rounded-md border bg-gray-50">
                    <img
                      src={p.featured_image_url || '/images/products/placeholder.png'}
                      alt={p.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="line-clamp-2 text-xs font-semibold text-gray-900">{p.name}</div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
