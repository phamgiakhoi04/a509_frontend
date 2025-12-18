import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { Country, PeriodArticle, Post, Unit } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function PhucDungQuocGia() {
  const { countrySlug } = useParams();
  const [countries, setCountries] = useState<Country[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [c, u, p, po] = await Promise.all([repo.getCountries(), repo.getUnits(), repo.getPeriodArticles(), repo.getPosts()]);
      setCountries(c);
      setUnits(u);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  const country = useMemo(() => countries.find((c) => c.slug === countrySlug) ?? null, [countries, countrySlug]);
  const countryUnits = useMemo(() => units.filter((u) => u.countrySlug === countrySlug), [units, countrySlug]);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  if (!countrySlug) return null;

  return (
    <PageShell right={right}>
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Phục dựng", to: "/phuc-dung" }, { label: country?.name ?? countrySlug }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{country?.name ?? "Quốc gia"}</h1>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="prose-like">
          <p>{country?.description ?? "Đang tải..."}</p>
        </div>
        <PlaceholderImage label="Ảnh" className="h-40" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {countryUnits.map((u) => (
          <Card key={u.slug}>
            <CardContent>
              <div className="font-semibold tracking-tight">
                <Link to={`/phuc-dung/${countrySlug}/${u.slug}`} className="hover:underline">
                  {u.name}
                </Link>
              </div>
              <p className="mt-2 text-sm text-slate-700">{u.description}</p>
              <div className="mt-3">
                <Link to={`/phuc-dung/${countrySlug}/${u.slug}`} className="text-sm font-medium hover:underline">
                  Xem thêm →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 text-sm text-slate-600">
        <div className="font-medium text-slate-700">Xem thêm:</div>
        <ul className="mt-2 list-disc pl-5 space-y-1">
          {countries.filter((c) => c.slug !== countrySlug).slice(0, 4).map((c) => (
            <li key={c.slug}>
              <Link className="hover:underline" to={`/phuc-dung/${c.slug}`}>{c.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}
