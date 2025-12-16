import { Link } from 'react-router-dom'

export default function CategorySidebar({ tree = [] }) {
  return (
    <div className="rounded-lg border bg-white">
      <div className="flex items-center gap-2 bg-[var(--brand)] px-3 py-2 text-sm font-bold uppercase text-white">
        <span>☰</span>
        <span>Danh mục</span>
      </div>

      <div className="p-2">
        <ul className="space-y-1">
          {tree.map((c) => (
            <li key={c.id}>
              <Link
                to={`/danh-muc/${c.slug}`}
                className="flex items-center justify-between rounded-md px-2 py-2 text-sm hover:bg-gray-50"
              >
                <span className="line-clamp-1">{c.name}</span>
                <span className="text-gray-400">›</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Tip: Modern hóa nhẹ giống bạn muốn */}
        <div className="mt-3 rounded-md bg-amber-50 p-3 text-xs text-amber-900">
          Muốn thuê máy? Vui lòng gọi hotline để được tư vấn nhanh.
        </div>
      </div>
    </div>
  )
}
