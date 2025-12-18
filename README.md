# 🖨️ TinViet Shop – Hệ thống Website Bán & Cho Thuê Máy In / Photocopy

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-4-646CFF?style=for-the-badge&logo=vite)
![NodeJS](https://img.shields.io/badge/Node.js-20-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4-000000?style=for-the-badge&logo=express)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1?style=for-the-badge&logo=mysql)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)

**TinViet Shop** là hệ thống website **bán – cho thuê – sửa chữa máy in & máy photocopy**, gồm:
- Website **khách hàng (Client)**
- Hệ thống **Admin quản trị**
- Backend API riêng biệt, phân quyền rõ ràng

Dự án được xây dựng theo hướng **Fullstack hiện đại**, dễ mở rộng và phù hợp triển khai thực tế.

---

## ✨ Chức năng chính

### 👤 Khách hàng (Client)
- Xem danh mục sản phẩm (Máy in, Máy photocopy, Mực in…)
- Xem danh sách sản phẩm theo danh mục
- Xem chi tiết sản phẩm
- Tìm kiếm sản phẩm
- Trang Giới thiệu
- Trang Liên hệ
- Đăng ký / Đăng nhập (Modal popup)
- Phân quyền tự động theo tài khoản

---

### 🛠️ Quản trị viên (Admin)
- Đăng nhập Admin (phân quyền bằng JWT + Role)
- Dashboard tổng quan:
  - Tổng sản phẩm
  - Tổng danh mục
  - Tổng người dùng
  - Biểu đồ thống kê (Chart)
- Quản lý sản phẩm:
  - Thêm / sửa / xóa sản phẩm
  - Gán danh mục
- Quản lý danh mục:
  - Danh mục dạng cây (parent / child)
  - Tạo – chỉnh sửa – kích hoạt / ẩn
- Quản lý người dùng (customer / admin)
- Bảo vệ route admin bằng middleware

---

## ⚙️ Công nghệ sử dụng

### Frontend
- **React 18**
- **Vite**
- **React Router v6**
- **Zustand** (Auth store)
- **Axios**
- **React Icons**
- **Chart.js / Recharts** (Dashboard)
- CSS thuần + layout responsive

### Backend
- **Node.js 20**
- **Express**
- **MySQL**
- **JWT Authentication**
- **bcrypt**
- **Middleware phân quyền Admin**
- Mô hình `controller – service – model`

---

## 🗂️ Kiến trúc tổng thể

```
Client (React)
      |
      | HTTP (JWT)
      v
Backend API (Node.js / Express)
      |
      v
MySQL Database
```

---

## 📁 Cấu trúc thư mục

### 🔹 Backend (`/backend`)

```
backend/
├── src/
│   ├── server.js
│   ├── index.js
│   ├── config/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middleware.js
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.js
│   │   │   ├── auth.service.js
│   │   │   ├── auth.model.js
│   │   │   └── auth.middleware.js
│   │   ├── product/
│   │   │   ├── product.model.js
│   │   │   ├── product.service.js
│   │   │   ├── product.controller.js
│   │   │   └── admin.product.router.js
│   │   ├── category/
│   │   │   ├── category.model.js
│   │   │   ├── category.service.js
│   │   │   ├── admin.category.service.js
│   │   │   ├── category.controller.js
│   │   │   ├── category.router.js
│   │   │   └── admin.category.router.js
│   │   └── user/
│   │       └── (chưa triển khai backend user chi tiết)
│   └── routes/
│       └── index.js
├── .env
├── package.json
└── nodemon.json
```

---

### 🔹 Frontend (`/frontend`)

```
frontend/
├── src/
│   ├── api/
│   │   ├── api.js
│   │   ├── product.service.js
│   │   ├── category.service.js
│   │   └── auth.service.js
│   ├── stores/
│   │   └── auth.store.js
│   ├── layouts/
│   │   ├── client/
│   │   │   └── ClientLayout.jsx
│   │   └── admin/
│   │       └── AdminLayout.jsx
│   ├── routes/
│   │   ├── ClientRoutes.jsx
│   │   ├── AdminRoutes.jsx
│   │   └── index.jsx
│   ├── components/
│   │   ├── CategorySidebar.jsx
│   │   ├── FeaturedCategoryBlock.jsx
│   │   ├── TopNav.jsx
│   │   └── AuthModal.jsx
│   ├── pages/
│   │   ├── client/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ProductListPage.jsx
│   │   │   ├── ProductDetailPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   └── ContactPage.jsx
│   │   └── admin/
│   │       ├── DashboardPage.jsx
│   │       ├── AdminProductPage.jsx
│   │       ├── AdminCategoryPage.jsx
│   │       └── AdminUserPage.jsx
│   ├── main.jsx
│   └── index.css
├── vite.config.js
└── package.json
```

---

## 🗄️ Database chính

### Bảng `users`
- `role`: `admin | customer | staff`
- `full_name`, `email`, `phone`
- `password_hash` (bcrypt)
- `status`

### Bảng `categories`
- `id`, `name`, `slug`
- `parent_id`
- `type` (product)
- `is_active`
- `sort`

### Bảng `products`
- `id`, `name`, `slug`
- `price`, `compare_at_price`
- `featured_image_url`
- `category_id`
- `brand_id`
- `status`

---

## 🚀 Hướng dẫn cài đặt & chạy dự án

### 1️⃣ Clone repository

```bash
git clone https://github.com/ThanhTam-16/Clone_Website_Tinviet_ReactNodeJS
cd tinviet-shop
```

### 2️⃣ Backend setup

```bash
cd backend
npm install
```

Tạo file `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tinviet_shop
JWT_SECRET=your_secret_key
```

Chạy backend:

```bash
npm run dev
```

Backend chạy tại: `http://localhost:5000`

### 3️⃣ Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:5173`

---

## 👤 Tài khoản demo

### Admin
- **Email**: `admin@tinviet.com`
- **Password**: `Admin@123`

### Customer
- **Email**: `customer@tinviet.com`
- **Password**: `Customer@123`

---

## 🔐 Phân quyền

- User có `role = admin` → truy cập `/admin`
- User thường → chỉ truy cập client
- Guard frontend + middleware backend đều được kiểm soát

---

## 📊 Dashboard Admin

- Biểu đồ tổng quan sản phẩm & danh mục
- Thống kê nhanh
- UI tối ưu hiển thị nhiều dữ liệu

---

## 🧩 Ghi chú quan trọng

- Backend user management có thể mở rộng thêm
- Dễ dàng tích hợp Order / Payment sau này
- Cấu trúc chuẩn để deploy production

---

## 📧 Liên hệ

- **Tác giả**: Thanh Tam
- **Dự án**: TinViet Shop
- **Công nghệ**: React + Node.js + MySQL

---

## 📄 License

MIT License © 2025
