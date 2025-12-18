import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";

import TrangChu from "@/pages/TrangChu";
import GioiThieu from "@/pages/GioiThieu";
import PhucDung from "@/pages/phucdung/PhucDung";
import PhucDungQuocGia from "@/pages/phucdung/PhucDungQuocGia";
import PhucDungDonVi from "@/pages/phucdung/PhucDungDonVi";
import PhucDungThoiKy from "@/pages/phucdung/PhucDungThoiKy";

import QuanTrang from "@/pages/quantrang/QuanTrang";
import QuanTrangLoai from "@/pages/quantrang/QuanTrangLoai";
import QuanTrangMon from "@/pages/quantrang/QuanTrangMon";

import DanhSachBaiViet from "@/pages/posts/DanhSachBaiViet";
import ChiTietBaiViet from "@/pages/posts/ChiTietBaiViet";

import LienHe from "@/pages/LienHe";
import TimKiem from "@/pages/TimKiem";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<TrangChu />} />
        <Route path="/gioi-thieu" element={<GioiThieu />} />

        <Route path="/phuc-dung" element={<PhucDung />} />
        <Route path="/phuc-dung/:countrySlug" element={<PhucDungQuocGia />} />
        <Route path="/phuc-dung/:countrySlug/:unitSlug" element={<PhucDungDonVi />} />
        <Route path="/phuc-dung/:countrySlug/:unitSlug/:periodSlug" element={<PhucDungThoiKy />} />

        <Route path="/quan-trang" element={<QuanTrang />} />
        <Route path="/quan-trang/:categorySlug" element={<QuanTrangLoai />} />
        <Route path="/quan-trang/:categorySlug/:itemSlug" element={<QuanTrangMon />} />

        <Route path="/tai-lieu" element={<DanhSachBaiViet type="tai-lieu" />} />
        <Route path="/tai-lieu/:slug" element={<ChiTietBaiViet type="tai-lieu" />} />

        <Route path="/tin-tuc" element={<DanhSachBaiViet type="tin-tuc" />} />
        <Route path="/tin-tuc/:slug" element={<ChiTietBaiViet type="tin-tuc" />} />

        <Route path="/lien-he" element={<LienHe />} />
        <Route path="/tim-kiem" element={<TimKiem />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
