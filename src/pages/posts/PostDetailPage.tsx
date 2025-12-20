import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { PeriodArticle, Post, PostType } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";
import { formatDateTime } from "@/utils/format";
import Comments from "@/components/Comments";

export default function ChiTietBaiViet({ type }: { type: PostType }) {
  const { slug } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);

  useEffect(() => {
    (async () => {
      const [po, p] = await Promise.all([repo.getPosts(), repo.getPeriodArticles()]);
      setPosts(po);
      setPeriods(p);
    })();
  }, []);

  const post = useMemo(() => posts.find((p) => p.type === type && p.slug === slug) ?? null, [posts, type, slug]);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  const label = type === "tai-lieu" ? "Tài liệu" : "Tin tức";

  if (!slug) return null;

  return (
    <PageShell right={right}>
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label, to: `/${type}` }, { label: post?.title ?? slug }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{post?.title ?? "Tiêu đề"}</h1>
      <div className="mt-1 text-xs text-slate-500">{post ? formatDateTime(post.createdAt) : ""}</div>

      <div className="mt-6">
        <Card>
          <CardContent>
            <div className="prose-like">
              <p className="whitespace-pre-line">{post?.content ?? "Không tìm thấy bài viết. Hãy thêm vào src/mocks/data.ts"}</p>
            </div>

            <div className="mt-6">
              <PlaceholderImage label="Ảnh" className="h-64" />
              {post?.coverCaption ? <div className="mt-2 text-xs text-slate-500 text-center">[{post.coverCaption}]</div> : null}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Comments postType={type} postSlug={slug} />
      </div>
    </PageShell>
  );
}
