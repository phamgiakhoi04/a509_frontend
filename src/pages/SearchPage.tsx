import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { articleApi } from "@/api/articleApi";
import type { ArticleDTO } from "@/types/models";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = (params.get("q") || "").trim();
  const [articles, setArticles] = useState<ArticleDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([articleApi.getLatest(), articleApi.getFeatured()])
      .then(([latest, featured]) => setArticles(Array.from(new Map([...latest, ...featured].map((item) => [item.id || item.slug, item])).values())))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false));
  }, []);

  const results = useMemo(() => {
    if (!query) return [];
    const normalized = query.toLowerCase();
    return articles.filter((article) => `${article.title} ${article.excerpt} ${article.content}`.toLowerCase().includes(normalized));
  }, [articles, query]);

  return (
    <section className="mx-auto max-w-[900px] bg-white px-5 py-8 md:px-10">
      <h1 className="font-display text-3xl font-black uppercase text-brand-redDark">Tìm kiếm</h1>
      {!query ? <p className="py-16 text-center text-gray-500">Nhập từ khóa trên thanh tra cứu để tìm bài viết.</p> : loading ? <p className="py-16 text-center text-gray-500">Đang tìm kiếm...</p> : results.length === 0 ? <p className="py-16 text-center text-gray-500">Không tìm thấy kết quả cho “{query}”.</p> : <div className="mt-6 space-y-4">{results.map((article) => <Link key={article.id || article.slug} to={`/tin-tuc/${article.slug}`} className="block border-b pb-4 hover:text-brand-red"><h2 className="font-display text-xl font-bold">{article.title}</h2><p className="mt-1 line-clamp-2 text-sm text-gray-600">{article.excerpt}</p></Link>)}</div>}
    </section>
  );
}
