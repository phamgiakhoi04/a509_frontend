import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { EquipmentItem, PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import { formatDateTime } from "@/utils/format";

export default function TimKiem() {
  const [params] = useSearchParams();
  const q = (params.get("q") ?? "").trim().toLowerCase();

  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [p, i, po] = await Promise.all([repo.getPeriodArticles(), repo.getEquipmentItems(), repo.getPosts()]);
      setPeriods(p);
      setItems(i);
      setPosts(po);
    })();
  }, []);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  const results = useMemo(() => {
    if (!q) return [];
    const out: { title: string; to: string; date?: string; type: string }[] = [];

    periods.forEach((p) => {
      const hay = [p.title, p.excerpt, p.content, p.periodLabel].join(" ").toLowerCase();
      if (hay.includes(q)) out.push({ title: p.title, to: `/phuc-dung/${p.countrySlug}/${p.unitSlug}/${p.slug}`, date: p.updatedAt, type: "Phục dựng" });
    });

    items.forEach((it) => {
      const hay = [it.name, it.excerpt, it.content, it.origin, it.usedBy, it.usedPeriod].join(" ").toLowerCase();
      if (hay.includes(q)) out.push({ title: it.name, to: `/quan-trang/${it.categorySlug}/${it.slug}`, type: "Quân trang" });
    });

    posts.forEach((po) => {
      const hay = [po.title, po.excerpt, po.content].join(" ").toLowerCase();
      if (hay.includes(q)) out.push({ title: po.title, to: `/${po.type}/${po.slug}`, date: po.createdAt, type: po.type === "tai-lieu" ? "Tài liệu" : "Tin tức" });
    });

    return out.sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
  }, [q, periods, items, posts]);

  return (
    <PageShell right={right}>
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Tìm kiếm" }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Kết quả tìm kiếm</h1>
      <p className="mt-2 text-sm text-slate-600">
        Từ khoá: <span className="font-medium">{q || "(trống)"}</span>
      </p>

      <div className="mt-6 space-y-4">
        {q && results.length === 0 ? (
          <div className="text-sm text-slate-600">Không có kết quả.</div>
        ) : null}

        {results.map((r) => (
          <Card key={r.to}>
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-slate-500">{r.type}</div>
                  <Link to={r.to} className="text-lg font-semibold hover:underline">{r.title}</Link>
                  {r.date ? <div className="mt-1 text-xs text-slate-500">{formatDateTime(r.date)}</div> : null}
                </div>
                <Link to={r.to} className="text-sm font-medium hover:underline">Mở →</Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
