import { useEffect, useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { repo } from "@/api/repository";
import type { EquipmentItem, PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function QuanTrangMon() {
  const { categorySlug, itemSlug } = useParams();
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [i, p, po] = await Promise.all([repo.getEquipmentItems(), repo.getPeriodArticles(), repo.getPosts()]);
      setItems(i);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  const it = useMemo(() => items.find((x) => x.slug === itemSlug && x.categorySlug === categorySlug) ?? null, [items, itemSlug, categorySlug]);

  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  if (!categorySlug || !itemSlug) return null;

  return (
    <PageShell right={right}>
      <Breadcrumbs
        items={[
          { label: "Trang chủ", to: "/" },
          { label: "Quân trang", to: "/quan-trang" },
          { label: categorySlug, to: `/quan-trang/${categorySlug}` },
          { label: it?.name ?? itemSlug },
        ]}
      />

      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{it?.name ?? "Món quân trang cụ thể"}</h1>

      {it ? (
        <div className="mt-6 grid gap-4 md:grid-cols-[1fr_1.2fr]">
          <Card>
            <CardContent>
              <div className="text-sm text-slate-700 space-y-2">
                <div><span className="font-medium">Nguồn gốc:</span> {it.origin}</div>
                <div><span className="font-medium">Sử dụng bởi:</span> {it.usedBy}</div>
                <div><span className="font-medium">Thời kì sử dụng:</span> {it.usedPeriod}</div>
              </div>
              <div className="mt-4 prose-like">
                <p className="whitespace-pre-line">{it.content}</p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {it.images.map((img) => (
              <div key={img.id}>
                <PlaceholderImage label="Ảnh" className="h-40" />
                <div className="mt-2 text-xs text-slate-500 text-center">{img.caption}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 text-sm text-slate-600">
          Không tìm thấy món quân trang. Hãy thêm vào <code>src/mocks/data.ts</code>.
        </div>
      )}
    </PageShell>
  );
}
