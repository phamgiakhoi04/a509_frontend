import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/home/HomePage";
import UniformPage from "@/pages/UniformPage";
import UniformDetailPage from "@/pages/UniformDetailPage";
import ReenactmentPage from "@/pages/ReenactmentPage";
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import AdminLayout from "@/components/admin/AdminLayout";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import UniformManager from "@/pages/admin/UniformManager";
import ReenactmentManager from "@/pages/admin/ReenactmentManager";
import EditUniform from "./pages/admin/edit/EditUniform";
import EditReenactment from "./pages/admin/edit/EditReenactment";
import AboutPage from "@/pages/AboutPage";
import ContactPage from "@/pages/ContactPage";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />

        <Route path="/phuc-dung">
          <Route index element={<ReenactmentPage />} />
          <Route path=":countrySlug" element={<div className="min-h-screen bg-white pt-20 text-center">Theo Quốc gia</div>} />
          <Route path=":countrySlug/:unitSlug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết Đơn vị</div>} />
          <Route path=":countrySlug/:unitSlug/:periodSlug" element={<div className="min-h-screen bg-white pt-20 text-center">Chi tiết Giai đoạn</div>} />
        </Route>

        <Route path="/quan-trang">
          <Route index element={<UniformPage />} />
          <Route path="trang-bi/:id" element={<UniformDetailPage />} />
        </Route>

        <Route path="/tin-tuc" element={<Navigate to="/tin-tuc/chia-se-kinh-nghiem" replace />} />
        <Route path="/tin-tuc/chia-se-kinh-nghiem" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Chia sẻ kinh nghiệm</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
        <Route path="/tin-tuc/goc-nhin" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Góc nhìn</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
        <Route path="/tin-tuc/nuoc-ngoai" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Nước ngoài</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
        <Route path="/tin-tuc/:slug" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Chi tiết Tin</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />

        <Route path="/tai-lieu">
          <Route index element={<Navigate to="/tai-lieu/quan-trang" replace />} />
          <Route path="quan-trang">
            <Route index element={<UniformPage />} />
            <Route path=":id" element={<UniformDetailPage />} />
          </Route>
          <Route path="chia-se-kinh-nghiem" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Chia sẻ kinh nghiệm</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
          <Route path="goc-nhin" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Góc nhìn</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
          <Route path="nuoc-ngoai" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Nước ngoài</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
          <Route path="nghien-cuu" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Nghiên cứu</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
          <Route path="review" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Review</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
          <Route path=":slug" element={<div className="min-h-screen bg-brand-bg pt-24 pb-12"><div className="container-page"><h1 className="font-display font-black text-3xl text-brand-red">Chi tiết Tài liệu</h1><p className="mt-4 text-brand-text/70">Nội dung đang được cập nhật...</p></div></div>} />
        </Route>

        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/tim-kiem" element={<div className="min-h-screen bg-white pt-20 text-center">Tìm kiếm</div>} />

        <Route path="*" element={<div className="min-h-screen bg-white flex items-center justify-center text-3xl font-bold text-gray-400">404 - Không tìm thấy</div>} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<div className="p-8 text-slate-700">Thống kê & Tổng quan (đang phát triển)</div>} />
          <Route path="quan-trang" element={<UniformManager />} />
          <Route path="phuc-dung" element={<ReenactmentManager />} />
          <Route path="quan-trang/edit/:id" element={<EditUniform />} />
          <Route path="phuc-dung/edit/:id" element={<EditReenactment />} />
        </Route>
      </Route>

      <Route path="/reset-password" element={<ResetPasswordForm />} />
    </Routes>
  );
}