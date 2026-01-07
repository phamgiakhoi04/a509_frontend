import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";

// --- Auth Components ---
import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

// --- Core Pages ---
import HomePage from "@/pages/home/HomePage";
import AboutPage from "@/pages/about/AboutPage"; 

// --- Reenactment (Phục dựng) ---
import ReenactmentPage from "@/pages/reenactment/ReenactmentPage";
import CountryPage from "@/pages/reenactment/CountryPage";
import UnitPage from "@/pages/reenactment/UnitPage";
import PeriodPage from "@/pages/reenactment/PeriodPage";

// --- Uniforms (Quân trang) ---
import UniformsPage from "@/pages/uniforms/UniformsPage";
import CategoryPage from "@/pages/uniforms/CategoryPage";
import ItemPage from "@/pages/uniforms/ItemPage";

// --- Posts (Tin tức / Tài liệu) ---
import PostListPage from "@/pages/posts/PostListPage";
import PostDetailPage from "@/pages/posts/PostDetailPage";

// --- Utility Pages ---
import ContactPage from "@/pages/Contact";
import SearchPage from "@/pages/Search";
import NotFoundPage from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* 1. Layout chính (Có Header & Footer) */}
      <Route element={<Layout />}>
        
        {/* Core */}
        <Route path="/" element={<HomePage />} />
        <Route path="/gioi-thieu" element={<AboutPage />} />

        {/* Phục dựng (Nested Route) */}
        <Route path="/phuc-dung">
          <Route index element={<ReenactmentPage />} />
          <Route path=":countrySlug" element={<CountryPage />} />
          <Route path=":countrySlug/:unitSlug" element={<UnitPage />} />
          <Route path=":countrySlug/:unitSlug/:periodSlug" element={<PeriodPage />} />
        </Route>

        {/* Quân trang (Nested Route) */}
        <Route path="/quan-trang">
          <Route index element={<UniformsPage />} />
          <Route path=":categorySlug" element={<CategoryPage />} />
          <Route path=":categorySlug/:itemSlug" element={<ItemPage />} />
        </Route>

        {/* Tài liệu & Tin tức */}
        <Route path="/tai-lieu" element={<PostListPage type="tai-lieu" />} />
        <Route path="/tai-lieu/:slug" element={<PostDetailPage type="tai-lieu" />} />
        
        <Route path="/tin-tuc" element={<PostListPage type="tin-tuc" />} />
        <Route path="/tin-tuc/:slug" element={<PostDetailPage type="tin-tuc" />} />

        {/* Trang phụ */}
        <Route path="/lien-he" element={<ContactPage />} />
        <Route path="/tim-kiem" element={<SearchPage />} />
        
        {/* Trang 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      {/* 2. Route Full màn hình (Không có Layout) */}
      <Route path="/reset-password" element={<ResetPasswordForm />} />
    </Routes>
  );
}