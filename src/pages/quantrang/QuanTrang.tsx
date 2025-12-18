import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { repo } from "@/api/repository";
import type { EquipmentCategory, PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function QuanTrang() {
  const [cats, setCats] = useState<EquipmentCategory[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [c, p, po] = await Promise.all([repo.getEquipmentCategories(), repo.getPeriodArticles(), repo.getPosts()]);
      setCats(c);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  return (
    <PageShell right={right}>
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Quân trang" }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Quân trang</h1>
      <p className="mt-2 text-sm text-slate-600">Chọn loại quân trang để xem các món cụ thể.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {cats.map((cat) => (
          <Link key={cat.slug} to={`/quan-trang/${cat.slug}`} className="block">
            <Card className="hover:bg-slate-50 transition">
              <CardContent>
                <PlaceholderImage label={cat.name} className="h-28" />
                <div className="mt-3 font-semibold">{cat.name}</div>
                <div className="mt-1 text-sm text-slate-600">{cat.description}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
