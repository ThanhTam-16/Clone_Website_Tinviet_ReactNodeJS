import { useQuery } from '@tanstack/react-query'
import { settingsService } from '../../services/settings.service'

export default function MainBar() {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getAll,
  })

  const hotline = settings?.hotline || '077 876 1999'
  const address = settings?.address || '362/2 Ung Văn Khiêm, TP.HCM'

  return (
    // wrapper ngoài: KHÔNG background
    <div className="w-full">
      {/* container giữa: CÓ background đỏ */}
      <div className="mx-auto max-w-6xl bg-[var(--brand)]">
        <div className="grid grid-cols-12 items-center gap-2 px-3 py-2">
          <div className="col-span-12 md:col-span-3">
            <div className="flex items-center gap-2 rounded-md bg-white/10 px-3 py-2 text-white">
              <span className="text-lg">☰</span>
              <span className="font-semibold uppercase">Danh mục sản phẩm</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4">
            <div className="flex overflow-hidden rounded-md bg-white">
              <input
                placeholder="Từ khóa tìm kiếm..."
                className="w-full px-3 py-2 text-sm outline-none"
              />
              <button className="bg-black/80 px-4 py-2 text-sm font-semibold text-white hover:bg-black">
                Tìm kiếm
              </button>
            </div>
          </div>

          <div className="col-span-12 md:col-span-2">
            <div className="rounded-md bg-white/10 px-3 py-2 text-center text-sm font-semibold text-white">
              Hotline: {hotline}
            </div>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="rounded-md bg-white/10 px-3 py-2 text-center text-sm text-white">
              {address}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

