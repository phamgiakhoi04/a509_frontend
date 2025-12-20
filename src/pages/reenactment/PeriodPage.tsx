import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function PhucDungThoiKy() {
  const { countrySlug, unitSlug, periodSlug } = useParams();
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [p, po] = await Promise.all([repo.getPeriodArticles(), repo.getPosts()]);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  const item = useMemo(
    () => periods.find((p) => p.slug === periodSlug && p.countrySlug === countrySlug && p.unitSlug === unitSlug) ?? null,
    [periods, periodSlug, countrySlug, unitSlug]
  );

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  if (!countrySlug || !unitSlug || !periodSlug) return null;

  return (
    <PageShell right={right}>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Phục dựng", to: "/phuc-dung" },
          { label: countrySlug, to: `/phuc-dung/${countrySlug}` },
          { label: unitSlug, to: `/phuc-dung/${countrySlug}/${unitSlug}` },
          { label: item?.title ?? periodSlug },
        ]}
      />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{item?.title ?? "Bài viết"}</h1>
      <p className="mt-2 text-sm text-slate-600">{item?.excerpt ?? "Đang tải..."}</p>

      <div className="mt-6 prose-like">
        <p className="whitespace-pre-line">{item?.content ?? ""}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {(item?.imageCaptions ?? []).map((img) => (
          <div key={img.id}>
            <PlaceholderImage label="Ảnh preview" className="h-40" />
            <div className="mt-2 text-xs text-slate-500 text-center">{img.caption}</div>
          </div>
        ))}
      </div>

      {item?.notes ? (
        <div className="mt-6 text-sm text-slate-600">{item.notes}</div>
      ) : null}
    </PageShell>
  );
}
