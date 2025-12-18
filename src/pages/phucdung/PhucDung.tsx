import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { repo } from "@/api/repository";
import type { Country, PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";

export default function PhucDung() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [c, p, po] = await Promise.all([repo.getCountries(), repo.getPeriodArticles(), repo.getPosts()]);
      setCountries(c);
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
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Phục dựng" }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Phục dựng</h1>
      <p className="mt-2 text-sm text-slate-600">Chọn quốc gia/khu vực để xem các mục con.</p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {countries.map((c) => (
          <Card key={c.slug}>
            <CardContent>
              <div className="text-lg font-semibold tracking-tight">
                <Link to={`/phuc-dung/${c.slug}`} className="hover:underline">{c.name}</Link>
              </div>
              <p className="mt-2 text-sm text-slate-700">{c.description}</p>
              <div className="mt-4">
                <Link to={`/phuc-dung/${c.slug}`} className="text-sm font-medium hover:underline">
                  Xem mục {c.name} →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
