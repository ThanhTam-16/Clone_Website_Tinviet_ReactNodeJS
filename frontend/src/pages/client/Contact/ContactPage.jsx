import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import CategorySidebar from '../Home/components/CategorySidebar'
import { categoryService } from '../../../services/category.service'

export default function ContactPage() {

    const { data: categoryTree = [] } = useQuery({
      queryKey: ['categories-tree'],
      queryFn: categoryService.getTree,
    })

  // Lấy 3 danh mục nổi bật (ưu tiên root). Nếu bạn muốn chọn theo "is_featured" sau này thì chỉnh tại đây.
  const featuredCategories = useMemo(() => {
    const roots = Array.isArray(categoryTree) ? categoryTree : []
    return roots.slice(0, 3)
  }, [categoryTree])

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Sidebar danh mục */}
      <aside className="col-span-12 lg:col-span-3">
        <CategorySidebar tree={categoryTree} />
      </aside>

      {/* Content */}
      <section className="col-span-12 lg:col-span-9">
        <div className="rounded-lg border bg-white p-5">
          <h1 className="text-xl font-extrabold text-gray-900">LIÊN HỆ</h1>
          <div className="mt-3 h-[2px] w-full bg-[var(--brand)]" />

          <div className="mt-5 overflow-hidden rounded-lg border bg-gray-50">
            <img
              src="/images/pages/contact_info.jpg"
              alt="Contact info"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
