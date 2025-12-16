import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import CategorySidebar from '../Home/components/CategorySidebar'
import { categoryService } from '../../../services/category.service'


export default function AboutPage() {

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
          <h1 className="text-xl font-extrabold text-gray-900">GIỚI THIỆU</h1>
          <div className="mt-3 h-[2px] w-full bg-[var(--brand)]" />

          <div className="mt-4 space-y-3 text-sm leading-6 text-gray-800">
            <p>
              Chào mừng quý khách đến với Tin Việt. Chúng tôi cung cấp các giải pháp máy in – photocopy,
              dịch vụ cho thuê, sửa chữa và vật tư tiêu hao, hướng đến chất lượng ổn định và tối ưu chi phí.
            </p>
            <p>
              Với đội ngũ kỹ thuật nhiều kinh nghiệm, chúng tôi tập trung vào tư vấn đúng nhu cầu,
              triển khai nhanh, hỗ trợ hậu mãi rõ ràng.
            </p>
            <p>
              Mục tiêu của chúng tôi là trở thành đối tác tin cậy cho doanh nghiệp và cá nhân trong
              quá trình vận hành và phát triển.
            </p>
          </div>

          {/* Ảnh dưới nội dung (bạn lưu theo tên này trong public/images/pages/) */}
          <div className="mt-6 overflow-hidden rounded-lg border bg-gray-50">
            <img
              src="/images/pages/about_banner.jpg"
              alt="About banner"
              className="h-auto w-full object-cover"
            />
            <img
              src="/images/pages/about_banner2.jpg"
              alt="About banner"
              className="h-auto w-full object-cover"
            />
          </div>

          <div className="mt-2 text-xs text-gray-500">
            Ảnh cần tạo: <b>/public/images/pages/about_banner.jpg</b>
          </div>
        </div>
      </section>
    </div>
  )
}
