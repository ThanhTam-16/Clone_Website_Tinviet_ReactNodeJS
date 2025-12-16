import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { categoryService } from '../../../services/category.service'
import { sliderService } from '../../../services/slider.service'

import CategorySidebar from './components/CategorySidebar.jsx'
import HeroSlider from './components/HeroSlider.jsx'
import PromoBanner from './components/PromoBanner.jsx'
import FeaturedCategoryBlock from './components/FeaturedCategoryBlock.jsx'

export default function HomePage() {
  const { data: categoryTree = [] } = useQuery({
    queryKey: ['categories-tree'],
    queryFn: categoryService.getTree,
  })

  const { data: sliders = [] } = useQuery({
    queryKey: ['sliders'],
    queryFn: sliderService.getAll,
  })

  // Lấy 3 danh mục nổi bật (ưu tiên root). Nếu bạn muốn chọn theo "is_featured" sau này thì chỉnh tại đây.
  const featuredCategories = useMemo(() => {
    const roots = Array.isArray(categoryTree) ? categoryTree : []
    return roots.slice(0, 3)
  }, [categoryTree])

  return (
    <div className="space-y-6">
      {/* Sidebar + Slider */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 md:col-span-3">
          <CategorySidebar tree={categoryTree} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <HeroSlider sliders={sliders} />
        </div>
      </div>

      {/* Banner lớn */}
      <PromoBanner />

      {/* Các block danh mục: 3 danh mục x 10 sản phẩm */}
      <div className="space-y-6">
        {featuredCategories.map((cat) => (
          <FeaturedCategoryBlock key={cat.id} category={cat} limit={10} />
        ))}
      </div>
    </div>
  )
}
