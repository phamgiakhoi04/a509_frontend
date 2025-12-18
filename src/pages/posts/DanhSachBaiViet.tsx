import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { repo } from "@/api/repository";
import type { PeriodArticle, Post, PostType } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import Pagination from "@/components/ui/Pagination";
import PlaceholderImage from "@/components/PlaceholderImage";
import { formatDateTime } from "@/utils/format";

const PAGE_SIZE = 3;

export default function DanhSachBaiViet({ type }: { type: PostType }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const [po, p] = await Promise.all([repo.getPosts(), repo.getPeriodArticles()]);
      setPosts(po);
      setPeriods(p);
    })();
  }, []);

  const filtered = useMemo(() => posts.filter((p) => p.type === type).sort((a,b)=>b.createdAt.localeCompare(a.createdAt)), [posts, type]);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pagePosts = useMemo(() => filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE), [filtered, page]);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  const title = type === "tai-lieu" ? "Tài liệu" : "Tin tức";

  return (
    <PageShell right={right}>
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: title }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h1>

      <div className="mt-6 space-y-4">
        {pagePosts.map((p) => (
          <Card key={p.slug}>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                <PlaceholderImage label="Ảnh" className="h-24" />
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    <Link to={`/${type}/${p.slug}`} className="hover:underline">{p.title}</Link>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">{formatDateTime(p.createdAt)}</div>
                  <p className="mt-2 text-sm text-slate-700">{p.excerpt}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Pagination page={page} totalPages={totalPages} onChange={(p) => setPage(Math.min(Math.max(1, p), totalPages))} />
    </PageShell>
  );
}
