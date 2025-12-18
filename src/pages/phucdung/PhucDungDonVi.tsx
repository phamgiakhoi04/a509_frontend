import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { PeriodArticle, Post, Unit } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function PhucDungDonVi() {
  const { countrySlug, unitSlug } = useParams();
  const [units, setUnits] = useState<Unit[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [u, p, po] = await Promise.all([repo.getUnits(), repo.getPeriodArticles(), repo.getPosts()]);
      setUnits(u);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  const unit = useMemo(() => units.find((u) => u.slug === unitSlug && u.countrySlug === countrySlug) ?? null, [units, unitSlug, countrySlug]);
  const related = useMemo(() => periods.filter((p) => p.countrySlug === countrySlug && p.unitSlug === unitSlug).sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt)), [periods, countrySlug, unitSlug]);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  if (!countrySlug || !unitSlug) return null;

  return (
    <PageShell right={right}>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Phục dựng", to: "/phuc-dung" },
          { label: countrySlug, to: `/phuc-dung/${countrySlug}` },
          { label: unit?.name ?? unitSlug },
        ]}
      />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{unit?.name ?? "Đơn vị"}</h1>
      <p className="mt-2 text-sm text-slate-600">{unit?.description ?? "Đang tải..."}</p>

      <div className="mt-6">
        <PlaceholderImage label="Ảnh" className="h-56" />
      </div>

      <h2 className="mt-8 text-lg font-semibold tracking-tight">Giai đoạn</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {related.map((p) => (
          <Card key={p.slug}>
            <CardContent>
              <div className="text-lg font-semibold tracking-tight">
                <Link to={`/phuc-dung/${countrySlug}/${unitSlug}/${p.slug}`} className="hover:underline">
                  {p.periodLabel}
                </Link>
              </div>
              <div className="mt-1 text-sm font-medium">{p.title}</div>
              <p className="mt-2 text-sm text-slate-700">{p.excerpt}</p>
              <div className="mt-3">
                <Link to={`/phuc-dung/${countrySlug}/${unitSlug}/${p.slug}`} className="text-sm font-medium hover:underline">
                  Xem chi tiết →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-sm text-slate-600">[Lặp lại các mục giai đoạn] — bạn có thể mở rộng danh sách khi có dữ liệu thật.</div>
    </PageShell>
  );
}
