import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// Các trang chính
import TrangChu from "@/pages/TrangChu";
import GioiThieu from "@/pages/GioiThieu";

// Phục dựng
import PhucDung from "@/pages/phucdung/PhucDung";
import PhucDungQuocGia from "@/pages/phucdung/PhucDungQuocGia";
import PhucDungDonVi from "@/pages/phucdung/PhucDungDonVi";
import PhucDungThoiKy from "@/pages/phucdung/PhucDungThoiKy";

// Quân trang
import QuanTrang from "@/pages/quantrang/QuanTrang";
import QuanTrangLoai from "@/pages/quantrang/QuanTrangLoai";
import QuanTrangMon from "@/pages/quantrang/QuanTrangMon";

// Bài viết (Tin tức / Tài liệu)
import DanhSachBaiViet from "@/pages/posts/DanhSachBaiViet";
import ChiTietBaiViet from "@/pages/posts/ChiTietBaiViet";

// Các trang phụ
import LienHe from "@/pages/LienHe";
import TimKiem from "@/pages/TimKiem";
import NotFound from "@/pages/NotFound";

// Trang Đổi mật khẩu (Mới thêm)
import ResetPasswordPage from "@/pages/ResetPasswordPage";

export default function App() {
  return (
    <Routes>
      {/* 1. Các trang có Header & Footer (Nằm trong Layout) */}
      <Route element={<Layout />}>
        <Route path="/" element={<TrangChu />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />

        {/* Phục dựng */}
        <Route path="/phuc-dung" element={<PhucDung />} />
        <Route path="/phuc-dung/:countrySlug" element={<PhucDungQuocGia />} />
        <Route path="/phuc-dung/:countrySlug/:unitSlug" element={<PhucDungDonVi />} />
        <Route path="/phuc-dung/:countrySlug/:unitSlug/:periodSlug" element={<PhucDungThoiKy />} />

        {/* Quân trang */}
        <Route path="/quan-trang" element={<QuanTrang />} />
        <Route path="/quan-trang/:categorySlug" element={<QuanTrangLoai />} />
        <Route path="/quan-trang/:categorySlug/:itemSlug" element={<QuanTrangMon />} />

        {/* Tài liệu */}
        <Route path="/tai-lieu" element={<DanhSachBaiViet type="tai-lieu" />} />
        <Route path="/tai-lieu/:slug" element={<ChiTietBaiViet type="tai-lieu" />} />

        {/* Tin tức */}
        <Route path="/tin-tuc" element={<DanhSachBaiViet type="tin-tuc" />} />
        <Route path="/tin-tuc/:slug" element={<ChiTietBaiViet type="tin-tuc" />} />

        {/* Khác */}
        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/tim-kiem" element={<TimKiem />} />
        
        {/* Trang 404 cho route con */}
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* 2. Các trang Full màn hình (Không có Header/Footer) */}
      {/* Đây là trang người dùng sẽ thấy khi bấm vào link trong email */}
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}