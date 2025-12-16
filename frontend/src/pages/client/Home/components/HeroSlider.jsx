import { useEffect, useState } from 'react'

const localSliders = [
  { id: 'local-1', image_url: '/images/sliders/slider-1.png', title: 'Slider 1' },
  { id: 'local-2', image_url: '/images/sliders/slider-2.png', title: 'Slider 2' },
  { id: 'local-3', image_url: '/images/sliders/slider-3.png', title: 'Slider 3' },
  { id: 'local-4', image_url: '/images/sliders/slider-4.png', title: 'Slider 4' },
]

export default function HeroSlider() {
  const items = localSliders
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, 3500)

    return () => clearInterval(timer)
  }, [items.length])

  const current = items[active]

  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <div className="relative h-[220px] md:h-[320px]">
        <img
          src={current.image_url}
          alt={current.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            // fallback an toàn tuyệt đối
            e.currentTarget.src = '/images/sliders/slider-1.png'
          }}
        />

        {/* Prev */}
        <button
          onClick={() =>
            setActive((prev) => (prev - 1 + items.length) % items.length)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ‹
        </button>

        {/* Next */}
        <button
          onClick={() => setActive((prev) => (prev + 1) % items.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-white hover:bg-black/60"
        >
          ›
        </button>

        {/* Dots */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                idx === active ? 'bg-[var(--brand)]' : 'bg-black/30'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
