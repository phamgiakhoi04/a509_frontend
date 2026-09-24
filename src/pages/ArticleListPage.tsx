import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { articleApi } from "@/api/articleApi";
import type { ArticleDTO } from "@/types/models";
import { formatDateTime } from "@/utils/format";
import LegacySidebar from "@/components/layout/LegacySidebar";

const labels: Record<string, string> = {
  "thoi-su": "Thời sự", "phong-su": "Phóng sự", "goc-nhin": "Góc nhìn",
  "nuoc-ngoai": "Nước ngoài", "chia-se-kinh-nghiem": "Chia sẻ kinh nghiệm",
};
// Route slugs mirror the `categories.slug` values from the backend.
// Keep this map only for legacy URLs that were previously exposed.
const apiSlugs: Record<string, string> = {};

export default function ArticleListPage({ categorySlug: fixedCategorySlug, title }: { categorySlug?: string; title?: string }) {
  const { categorySlug: routeCategorySlug } = useParams<{ categorySlug: string }>();
  const categorySlug = fixedCategorySlug || routeCategorySlug || "tin-tuc";
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const request = categorySlug === "tin-tuc"
      ? articleApi.getLatest()
      : articleApi.getByCategory(apiSlugs[categorySlug] || categorySlug);
    request.then(setArticles).catch(() => setArticles([])).finally(() => setLoading(false));
  }, [categorySlug]);

  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 bg-white px-5 py-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_240px]">
      <section className="min-w-0">
        <h1 className="border-b-2 border-brand-red pb-3 font-display text-3xl font-black uppercase text-brand-redDark">{title || labels[categorySlug] || "Tin tức"}</h1>
        {loading ? <p className="py-16 text-center text-gray-500">Đang tải...</p> : articles.length === 0 ? <p className="py-16 text-center text-gray-500">Chưa có bài viết trong danh mục này.</p> : <div className="mt-6 space-y-6">{articles.map((article) => <Link key={article.id} to={`/tin-tuc/${article.slug}`} className="grid gap-4 border-b pb-6 md:grid-cols-[220px_1fr] hover:text-brand-red">{article.thumbnailUrl && <img src={article.thumbnailUrl} alt={article.title} className="aspect-[4/3] w-full object-cover" />}<div><h2 className="font-display text-xl font-black uppercase">{article.title}</h2><p className="mt-1 text-sm italic text-gray-500">{article.publishedAt && formatDateTime(article.publishedAt)}</p><p className="mt-2 line-clamp-3 text-gray-700">{article.excerpt}</p></div></Link>)}</div>}
      </section>
      <LegacySidebar />
    </div>
  );
}
