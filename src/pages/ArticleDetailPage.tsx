import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { articleApi } from "@/api/articleApi";
import type { ArticleDTO } from "@/types/models";
import { formatDateTime } from "@/utils/format";
import CommentSection from "@/components/CommentSection";
import LegacySidebar from "@/components/layout/LegacySidebar";

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<ArticleDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [images, setImages] = useState<{ id: number; imageUrl: string; description?: string }[]>([]);

  useEffect(() => {
    if (!slug) return;
    articleApi.getBySlug(slug)
      .then(async (data) => {
        setArticle(data);
        if (data.id) setImages(await articleApi.getImages(data.id).catch(() => []));
      })
      .catch(() => setError("Không tìm thấy bài viết hoặc bài viết chưa được xuất bản."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="container-page py-20 text-center text-gray-500">Đang tải bài viết...</div>;
  if (error || !article) return <div className="container-page py-20 text-center"><p className="text-brand-red">{error || "Không tìm thấy bài viết."}</p><Link className="mt-4 inline-block text-brand-red underline" to="/">Về trang chủ</Link></div>;

  return (
    <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 bg-white px-5 py-6 md:px-10 lg:grid-cols-[minmax(0,1fr)_240px]">
      <article className="min-w-0">
        <div className="bg-[#f1f1f1] px-3 py-2 text-sm text-gray-700">Tin tức&nbsp; / &nbsp;Bài viết</div>
        <Link to="/" className="mt-5 inline-block text-sm font-bold text-brand-red hover:underline">← Về trang chủ</Link>
        <h1 className="mt-4 font-display text-3xl font-black leading-tight text-black md:text-4xl">{article.title}</h1>
        <p className="mt-3 text-base italic text-gray-500">{article.authorName || "A509"} {article.publishedAt && `| ${formatDateTime(article.publishedAt)}`}</p>
        {article.excerpt && <p className="mt-5 text-lg font-bold leading-relaxed text-gray-700">{article.excerpt}</p>}
        {article.thumbnailUrl && <img src={article.thumbnailUrl} alt={article.title} className="mt-6 max-h-[520px] w-full object-cover" />}
        <div className="mt-6 whitespace-pre-wrap text-[17px] leading-relaxed text-gray-800">{article.content}</div>
        {images.map((image) => <figure key={image.id} className="mt-6"><img src={image.imageUrl} alt={image.description || article.title} className="w-full" />{image.description && <figcaption className="bg-gray-100 px-3 py-2 text-center text-sm text-gray-600">{image.description}</figcaption>}</figure>)}
        <div className="mt-8 flex justify-end gap-2 text-sm font-bold text-gray-700">Chia sẻ: <span className="text-blue-600">●</span><span>✕</span><span className="text-red-700">●</span></div>
        {article.id && <div className="mt-8"><CommentSection articleId={article.id} variant="legacy" /></div>}
      </article>
      <LegacySidebar />
    </div>
  );
}
