import { Routes, Route } from 'react-router-dom'
import ClientLayout from '../layouts/client/ClientLayout.jsx'
import HomePage from '../pages/client/Home/HomePage.jsx'
import ProductDetailPage from '../pages/client/ProductDetail/ProductDetailPage.jsx'
import AboutPage from '../pages/client/About/AboutPage.jsx'
import ContactPage from '../pages/client/Contact/ContactPage.jsx'
import CategoryProductsPage from '../pages/client/Category/CategoryProductsPage.jsx'
import LoginPage from '../pages/client/Auth/LoginPage.jsx'
import RegisterPage from '../pages/client/Auth/RegisterPage.jsx'





export default function ClientRoutes() {
  return (
    <Routes>
      <Route element={<ClientLayout />}>
        <Route index element={<HomePage />} />
        <Route path="san-pham/:slug" element={<ProductDetailPage />} />
        <Route path="gioi-thieu" element={<AboutPage />} />
        <Route path="lien-he" element={<ContactPage />} />
        <Route path="danh-muc/:idOrSlug" element={<CategoryProductsPage />} />
        <Route path="dang-nhap" element={<LoginPage />} />
        <Route path="dang-ky" element={<RegisterPage />} />



        {/* Các trang khác bạn sẽ gắn sau:
            /gioi-thieu, /lien-he, /danh-muc/:slug, /san-pham/:slug, /gio-hang...
        */}
      </Route>
    </Routes>
  )
}
