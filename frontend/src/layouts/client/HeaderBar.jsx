import { useQuery } from '@tanstack/react-query'
import { settingsService } from '../../services/settings.service'
import { useCartStore } from '../../stores/cart.store'

export default function HeaderBar() {
  const cartCount = useCartStore((s) => s.count)


  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-12 gap-3 px-3 py-3">
        <div className="col-span-12 md:col-span-9">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-5">
              <div className="h-[90px] overflow-hidden rounded-lg border bg-gray-50">
                <img
                  src="/images/header-left.png"
                  alt="header-left"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-7">
              <div className="h-[90px] overflow-hidden rounded-lg border bg-gray-50">
                <img
                  src="/images/header-right.png"
                  alt="header-right"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        {/* <div className="col-span-12 md:col-span-3 flex items-start md:justify-end">
          <button className="w-full rounded-lg bg-[var(--brand)] px-4 py-3 text-white hover:bg-[var(--brand-2)] md:w-auto">
            Giỏ hàng ({cartCount})
          </button>
        </div> */}
      </div>
    </div>
  )
}
