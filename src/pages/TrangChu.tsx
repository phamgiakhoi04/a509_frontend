import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { repo } from "@/api/repository";
import type { Country, EquipmentCategory, PeriodArticle, Post, Unit } from "@/types/models";
import LeftMenu from "@/components/layout/LeftMenu";
import RightSidebar from "@/components/layout/RightSidebar";
import HomeCarousel from "@/components/HomeCarousel";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";
import { formatDateTime } from "@/utils/format";

type Recent = { title: string; to: string; date: string };

export default function TrangChu() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [cats, setCats] = useState<EquipmentCategory[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      const [c, u, ca, p, po] = await Promise.all([
        repo.getCountries(),
        repo.getUnits(),
        repo.getEquipmentCategories(),
        repo.getPeriodArticles(),
        repo.getPosts(),
      ]);
      if (!alive) return;
      setCountries(c);
      setUnits(u);
      setCats(ca);
      setPeriods(p);
      setPosts(po);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  const recent: Recent[] = useMemo(() => {
    const fromPeriods: Recent[] = periods.map((x) => ({
      title: x.title,
      to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`,
      date: x.updatedAt,
    }));
    const fromPosts: Recent[] = posts.map((p) => ({
      title: p.title,
      to: `/${p.type}/${p.slug}`,
      date: p.createdAt,
    }));
    return [...fromPeriods, ...fromPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
  }, [periods, posts]);

  const newestCards = useMemo(() => recent.slice(0, 3), [recent]);

  return (
    <div className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[280px_1fr_320px]">
        <div className="lg:sticky lg:top-24 h-fit">
          {loading ? (
            <div className="text-sm text-slate-600">Đang tải...</div>
          ) : (
            <LeftMenu countries={countries} units={units} categories={cats} />
          )}
        </div>

        <div className="space-y-6">
          <HomeCarousel />

          <Card>
            <CardHeader>
              <div className="font-semibold">Giới thiệu nhanh</div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="prose-like">
                  <p>
                    Chào mừng đến với website dự án A509 (placeholder). Bạn có thể tổ chức nội dung theo
                    <b> Phục dựng</b>, <b>Quân trang</b>, <b>Tài liệu</b> và <b>Tin tức</b>.
                  </p>
                  <p className="mt-2">
                    Sau này khi có backend, bạn chỉ cần đổi cấu hình để lấy dữ liệu từ API — UI không cần viết lại.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link to="/gioi-thieu" className="text-sm font-medium hover:underline">Xem giới thiệu →</Link>
                    <span className="text-slate-300">•</span>
                    <Link to="/phuc-dung" className="text-sm font-medium hover:underline">Vào mục phục dựng →</Link>
                  </div>
                </div>
                <PlaceholderImage label="Ảnh" className="h-48 md:h-full" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="font-semibold">Mới nhất</div>
                <Link to="/tin-tuc" className="text-sm font-medium hover:underline">Xem thêm →</Link>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-sm text-slate-600">Đang tải...</div>
              ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {newestCards.map((c) => (
                    <Link key={c.to} to={c.to} className="block rounded-2xl bg-slate-50 ring-1 ring-slate-200 p-4 hover:bg-slate-100">
                      <div className="font-semibold">{c.title}</div>
                      <div className="mt-2 text-xs text-slate-500">{formatDateTime(c.date)}</div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:sticky lg:top-24 h-fit">
          <RightSidebar recent={recent.map((r) => ({ kind: "bai-viet", ...r }))} />
        </div>
      </div>
    </div>
  );
}
