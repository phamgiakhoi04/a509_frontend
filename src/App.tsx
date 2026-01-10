import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/home/HomePage";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

import UniformManager from "@/pages/admin/UniformManager";
import ReenactmentManager from "@/pages/admin/ReenactmentManager";
import EditUniform from "./pages/admin/edit/EditUniform";
// Uncomment khi có file
// import DocumentManager from "@/pages/admin/DocumentManager";
// import NewsManager from "@/pages/admin/NewsManager";
// import UserManager from "@/pages/admin/UserManager";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<div className="min-h-screen bg-white pt-20 text-center">Giới Thiệu</div>} />
        <Route path="/about" element={<div className="min-h-screen bg-white pt-20 text-center">About</div>} />

        <Route path="/phuc-dung">
          <Route index element={<div className="min-h-screen bg-white pt-20 text-center">Phục Dựng</div>} />
          <Route path=":countrySlug" element={<div className="min-h-screen bg-white pt-20 text-center">Theo Quốc gia</div>} />
          <Route path=":countrySlug/:unitSlug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết Đơn vị</div>} />
          <Route path=":countrySlug/:unitSlug/:periodSlug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết Giai đoạn</div>} />
        </Route>

        <Route path="/quan-trang">
          <Route index element={<div className="min-h-screen bg-white pt-20 text-center">Quân Trang</div>} />
          <Route path=":categorySlug" element={<div className="min-h-screen bg-white pt-20 text-center">Danh mục</div>} />
          <Route path=":categorySlug/:itemSlug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết</div>} />
        </Route>

        <Route path="/tin-tuc" element={<div className="min-h-screen bg-white pt-20 text-center">Tin Tức</div>} />
        <Route path="/tin-tuc/:slug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết Tin</div>} />

        <Route path="/tai-lieu" element={<div className="min-h-screen bg-white pt-20 text-center">Tài Liệu</div>} />
        <Route path="/tai-lieu/:slug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết Tài Liệu</div>} />

        <Route path="/lien-he" element={<div className="min-h-screen bg-white pt-20 text-center">Liên Hệ</div>} />
        <Route path="/tim-kiem" element={<div className="min-h-screen bg-white pt-20 text-center">Tìm kiếm</div>} />

        <Route path="*" element={<div className="min-h-screen bg-white flex items-center justify-center text-3xl font-bold text-gray-400">404 - Không tìm thấy</div>} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<div className="p-8 text-slate-700">Thống kê & Tổng quan (đang phát triển)</div>} />
          
          <Route path="quan-trang" element={<UniformManager />} />
          <Route path="phuc-dung" element={<ReenactmentManager />} />
          {/* Uncomment khi có file */}
          {/* <Route path="tai-lieu" element={<DocumentManager />} /> */}
          {/* <Route path="tin-tuc" element={<NewsManager />} /> */}
          {/* <Route path="users" element={<UserManager />} /> */}
          <Route path="quan-trang/edit/:id" element={<EditUniform />} />
        </Route>
      </Route>

      <Route path="/reset-password" element={<ResetPasswordForm />} />
    </Routes>
  );
}