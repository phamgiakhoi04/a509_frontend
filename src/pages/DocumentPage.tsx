import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { articleApi } from "@/api/articleApi";
import type { ArticleDTO } from "@/types/models";
import { formatDateTime } from "@/utils/format";
import LegacySidebar from "@/components/layout/LegacySidebar";

const sections = [
  ["/tai-lieu/quan-trang", "Quân trang"],
  ["/tai-lieu/anh-tu-lieu", "Ảnh tư liệu"],
  ["/tai-lieu/hoi-uc-ccb", "Hồi ức CCB"],
  ["/tai-lieu/thu-vien", "Thư viện"],
  ["/tai-lieu/nghien-cuu", "Từ điển"],
];
const categorySlugs = ["anh-tu-lieu", "hoi-uc-ccb", "thu-vien", "nghien-cuu"];

export default function DocumentPage() {
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all(categorySlugs.map((slug) => articleApi.getByCategory(slug)))
      .then((groups) => {
        const unique = new Map<number, ArticleDTO>();
        groups.flat().forEach((article) => { if (article.id) unique.set(article.id, article); });
        setArticles(Array.from(unique.values()));
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  return <div className="grid grid-cols-1 gap-8 bg-white px-5 py-6 md:grid-cols-[1fr_290px]">
    <main className="min-w-0">
      <div className="mb-7 bg-[#f1f1f1] px-3 py-2 text-[16px] text-[#444]">Tài liệu</div>
      <h1 className="mb-5 border-b-2 border-[#b51f24] pb-3 font-display text-3xl font-black uppercase text-[#9f2922]">Tài liệu</h1>
      <nav className="mb-7 flex flex-wrap gap-2">{sections.map(([to, label]) => <Link key={to} to={to} className="border border-[#ccc] px-3 py-2 text-sm hover:border-[#b51f24] hover:text-[#b51f24]">{label}</Link>)}</nav>
      {loading ? <p className="py-16 text-center text-[#777]">Đang tải dữ liệu...</p> : articles.length === 0 ? <p className="py-16 text-center text-[#777]">Chưa có tài liệu được đăng.</p> : <div className="space-y-6">{articles.map((article) => <Link key={article.id} to={`/tin-tuc/${article.slug}`} className="group grid gap-4 border-b border-[#ddd] pb-6 md:grid-cols-[220px_1fr]">
        {article.thumbnailUrl ? <img src={article.thumbnailUrl} alt={article.title} className="aspect-[4/3] w-full object-cover" /> : <div className="flex aspect-[4/3] items-center justify-center bg-[#f1f1f1] text-5xl text-[#ccc]">▧</div>}
        <div><h2 className="font-display text-xl font-black uppercase leading-tight group-hover:text-[#b51f24]">{article.title}</h2><p className="mt-1 text-sm italic text-[#888]">{article.publishedAt ? formatDateTime(article.publishedAt) : ""}</p><p className="mt-2 line-clamp-3 text-[#555]">{article.excerpt || "Nội dung đang được cập nhật..."}</p></div>
      </Link>)}</div>}
    </main>
    <LegacySidebar />
  </div>;
}
