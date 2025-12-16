import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { productService } from '../../../../services/product.service'
import { formatPriceVND } from '../../../../utils/format'

export default function FeaturedCategoryBlock({ category, limit = 10 }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products', 'home-featured', category?.id, limit],
    queryFn: () => productService.list({ categoryId: category.id, limit }),
    enabled: !!category?.id,
  })

  const items = data?.items || []

  return (
    <section className="rounded-lg border bg-white">
      {/* Header giống kiểu thanh đỏ + title */}
      <div className="flex items-center justify-between border-b px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm bg-[var(--brand)]" />
          <h2 className="text-sm font-bold uppercase">{category?.name}</h2>
        </div>

        <Link
          to={`/danh-muc/${category?.id}`}
          className="text-sm font-semibold text-[var(--brand)] hover:underline"
        >
          Xem tất cả →
        </Link>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="text-sm text-gray-600">Đang tải sản phẩm...</div>
        ) : isError ? (
          <div className="text-sm text-red-600">
            Lỗi tải sản phẩm danh mục "{category?.name}"
          </div>
        ) : items.length === 0 ? (
          <div className="text-sm text-gray-600">Chưa có sản phẩm.</div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {items.map((p) => (
              <Link
                key={p.id}
                to={`/san-pham/${p.slug}`}
                className="group rounded-lg border bg-white p-2 hover:shadow-sm"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-gray-50">
                  <img
                    src={p.featured_image_url || '/images/products/placeholder.png'}
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
      </div>
    </section>
  )
}
