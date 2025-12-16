export const formatPriceVND = (n) => {
  if (n == null) return 'Liên hệ'
  const num = Number(n)
  if (Number.isNaN(num)) return 'Liên hệ'
  return num.toLocaleString('vi-VN') + 'đ'
}
