import { useQuery } from '@tanstack/react-query'
import { settingsService } from '../../services/settings.service'
import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaEnvelope,
} from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'


export default function Footer() {
  const { data: settings } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsService.getAll,
  })

  const company = settings?.company_name || 'CÔNG TY TNHH KỸ THUẬT TIN VIỆT'
  const address = settings?.address || '362/2 Ung Văn Khiêm, Phường Thạnh Mỹ Tây, TP.HCM'
  const phones = settings?.phones || '028 35 123 717 | 077 5155 222 | 0773 688 222'
  const hotline = settings?.hotline || '077 876 1999'
  const email = settings?.email || 'kinhdoanh01@tinvietvp.com'
  const slogan =
    settings?.slogan ||
    'Cung cấp Mực in, Mực Photocopy, sửa máy, Nạp mực: Máy in, Photocopy...'

  return (
    <footer className="bg-white">
      {/* Thanh tiêu đề cam/xanh như ảnh */}
      <div className="border-t">
        <div className="mx-auto max-w-6xl px-3">
          <div className="grid grid-cols-12">
            <div className="col-span-12 md:col-span-4 bg-[#f58220] px-4 py-3 text-sm font-bold uppercase text-white">
              {company}
            </div>
            <div className="col-span-12 md:col-span-8 bg-[#1f3a73] px-4 py-3 text-sm text-white">
              {slogan}
            </div>
          </div>
        </div>
      </div>

      {/* Nội dung footer: trái công ty, phải chính sách */}
      <div className="mx-auto max-w-6xl px-3 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left */}
          <div className="col-span-12 md:col-span-5">
            <div className="overflow-hidden rounded-md border bg-white">
              <img
                src="/images/footer-banner.png"
                alt="footer-banner"
                className="h-[120px] w-full object-cover"
              />
            </div>

            <h3 className="mt-4 text-base font-bold text-gray-900">{company}</h3>
            <div className="mt-2 space-y-1 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-0.5 text-gray-500" />
                <span>{address}</span>
              </div>

              <div className="flex items-start gap-2">
                <FaPhoneAlt className="mt-0.5 text-gray-500" />
                <span>{phones}</span>
              </div>

              <div className="flex items-start gap-2">
                <FaPhoneAlt className="mt-0.5 text-[var(--brand)]" />
                <span className="font-bold text-[var(--brand)]">{hotline}</span>
              </div>

              <div className="flex items-start gap-2">
                <FaEnvelope className="mt-0.5 text-gray-500" />
                <span>{email}</span>
              </div>

            </div>

            <div className="mt-4 flex items-center gap-3">
              <a
                href="#"
                aria-label="facebook"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#1877f2] text-white transition hover:opacity-90"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="#"
                aria-label="google"
                className="grid h-10 w-10 place-items-center rounded-full bg-white border transition hover:bg-gray-100"
              >
                <FcGoogle size={20} />
              </a>

              <a
                href="#"
                aria-label="youtube"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#ff0000] text-white transition hover:opacity-90"
              >
                <FaYoutube size={20} />
              </a>

              <a
                href="#"
                aria-label="twitter"
                className="grid h-10 w-10 place-items-center rounded-full bg-[#1da1f2] text-white transition hover:opacity-90"
              >
                <FaTwitter size={18} />
              </a>
            </div>

          </div>

          {/* Right */}
          <div className="col-span-12 md:col-span-7">
            <h3 className="text-base font-bold text-gray-900">CHÍNH SÁCH & QUY ĐỊNH</h3>
            <ul className="mt-3 list-disc space-y-3 pl-6 text-sm text-gray-700">
              <li className="hover:underline cursor-pointer">Chính sách bán hàng</li>
              <li className="hover:underline cursor-pointer">Chính sách bảo hành</li>
              <li className="hover:underline cursor-pointer">Đối tác Tin Việt</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright line */}
      <div className="border-t bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-3 py-3 text-xs text-gray-600">
          <div>Copyright © {new Date().getFullYear()} by {company}</div>
          <div>Thiết kế và phát triển bởi Vinapro (clone)</div>
        </div>
      </div>
    </footer>
  )
}
