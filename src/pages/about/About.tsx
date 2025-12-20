import { useEffect, useMemo, useState } from "react";
import { repo } from "@/api/repository";
import type { PeriodArticle, Post } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function GioiThieu() {
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
      <Breadcrumbs items={[{ label: "Trang chủ", to: "/" }, { label: "Giới thiệu" }]} />
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Giới thiệu về A509</h1>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent>
            <div className="prose-like">
              <p>
                Đây là trang giới thiệu (placeholder). Bạn có thể viết:
              </p>
              <ul className="mt-2">
                <li>A509 là gì, mục tiêu dự án</li>
                <li>Nội quy an toàn khi tái hiện</li>
                <li>Tiêu chuẩn “đúng”/“gần đúng”/“trưng bày”</li>
                <li>Cách tham gia và liên hệ</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <PlaceholderImage label="Ảnh" className="h-64" />
      </div>
    </PageShell>
  );
}
