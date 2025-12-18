import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { EquipmentCategory, EquipmentItem, PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function QuanTrangLoai() {
  const { categorySlug } = useParams();
  const [cats, setCats] = useState<EquipmentCategory[]>([]);
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [c, i, p, po] = await Promise.all([repo.getEquipmentCategories(), repo.getEquipmentItems(), repo.getPeriodArticles(), repo.getPosts()]);
      setCats(c);
      setItems(i);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  const cat = useMemo(() => cats.find((c) => c.slug === categorySlug) ?? null, [cats, categorySlug]);
  const list = useMemo(() => items.filter((i) => i.categorySlug === categorySlug), [items, categorySlug]);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  if (!categorySlug) return null;

  return (
    <PageShell right={right}>
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Quân trang", to: "/quan-trang" }, { label: cat?.name ?? categorySlug }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{cat?.name ?? "Loại quân trang"}</h1>
      <p className="mt-2 text-sm text-slate-600">{cat?.description ?? ""}</p>

      <div className="mt-6 space-y-4">
        {list.map((it) => (
          <Card key={it.slug}>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-[140px_1fr]">
                <PlaceholderImage label="Ảnh" className="h-28" />
                <div>
                  <div className="text-lg font-semibold tracking-tight">
                    <Link to={`/quan-trang/${categorySlug}/${it.slug}`} className="hover:underline">
                      {it.name}
                    </Link>
                  </div>
                  <p className="mt-2 text-sm text-slate-700">{it.excerpt}</p>
                  <div className="mt-3">
                    <Link to={`/quan-trang/${categorySlug}/${it.slug}`} className="text-sm font-medium hover:underline">
                      Xem chi tiết →
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
