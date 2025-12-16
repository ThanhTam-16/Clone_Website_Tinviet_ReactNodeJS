const partners = [
  { name: 'Brother', src: '/images/brands/brother.png' },
  { name: 'Konica Minolta', src: '/images/brands/konica.png' },
  { name: 'Panasonic', src: '/images/brands/panasonic.png' },
  { name: 'Ricoh', src: '/images/brands/ricoh.png' },
  { name: 'Fuji Xerox', src: '/images/brands/fujixerox.png' },
  { name: 'OKI', src: '/images/brands/oki.png' },
  { name: 'Epson', src: '/images/brands/epson.png' },
  { name: 'Canon', src: '/images/brands/canon.png' },
  { name: 'Toshiba', src: '/images/brands/toshiba.png' },
  { name: 'HP', src: '/images/brands/hp.png' },
]

export default function PartnersBar() {
  return (
    <div className="border-t border-b bg-white">
      <div className="mx-auto max-w-6xl px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="whitespace-nowrap text-sm font-semibold text-gray-800">
            ĐỐI TÁC:
          </div>

          <div className="flex flex-1 flex-wrap items-center gap-x-6 gap-y-3">
            {partners.map((p) => (
              <img
                key={p.name}
                src={p.src}
                alt={p.name}
                className="h-6 w-auto opacity-90 hover:opacity-100"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
