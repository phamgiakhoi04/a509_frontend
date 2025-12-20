import { useEffect, useMemo, useState } from "react";
import { repo } from "@/api/repository";
import type { PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";

export default function LienHe() {
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    (async () => {
      const [p, po] = await Promise.all([repo.getPeriodArticles(), repo.getPosts()]);
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
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Liên hệ" }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Thông tin liên hệ</h1>

      <div className="mt-6 max-w-2xl">
        <Card>
          <CardContent>
            <ul className="text-sm text-slate-700 space-y-2">
              <li><span className="font-medium">E-mail:</span> xxxxxxxxxx</li>
              <li><span className="font-medium">Facebook:</span> xxxxxxxxxx</li>
              <li><span className="font-medium">Twitter:</span> xxxxxxxxxx</li>
              <li><span className="font-medium">Youtube:</span> xxxxxxxxxx</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageShell>
  );
}
