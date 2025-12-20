import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { repo } from "@/api/repository";
import type { Country, PeriodArticle, Post, Unit } from "@/types/models";
import PageShell from "@/components/layout/PageShell";
import Breadcrumbs from "@/components/layout/Breadcrumbs";
import Card, { CardContent } from "@/components/ui/Card";
import PlaceholderImage from "@/components/PlaceholderImage";

export default function CountryPage() {
  const { countrySlug } = useParams();
  
  // State lưu dữ liệu
  const [countries, setCountries] = useState<Country[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [periods, setPeriods] = useState<PeriodArticle[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);

  // Fetch dữ liệu 1 lần khi load trang
  useEffect(() => {
    (async () => {
      const [c, u, p, po] = await Promise.all([
        repo.getCountries(), 
        repo.getUnits(), 
        repo.getPeriodArticles(), 
        repo.getPosts()
      ]);
      setCountries(c);
      setUnits(u);
      setPeriods(p);
      setPosts(po);
    })();
  }, []);

  // Lọc dữ liệu theo slug hiện tại
  const country = useMemo(() => countries.find((c) => c.slug === countrySlug) ?? null, [countries, countrySlug]);
  const countryUnits = useMemo(() => units.filter((u) => u.countrySlug === countrySlug), [units, countrySlug]);

  // Sidebar bên phải
  const right = useMemo(() => {
    const a = periods.map((x) => ({ title: x.title, to: `/phuc-dung/${x.countrySlug}/${x.unitSlug}/${x.slug}`, date: x.updatedAt }));
    const b = posts.map((p) => ({ title: p.title, to: `/${p.type}/${p.slug}`, date: p.createdAt }));
    return [...a, ...b].sort((x, y) => y.date.localeCompare(x.date)).slice(0, 8);
  }, [periods, posts]);

  if (!countrySlug) return null;

  return (
    <PageShell right={right}>
      {/* Breadcrumbs điều hướng */}
      <Breadcrumbs items={[
        { label: "Trang chủ", to: "/" }, 
        { label: "Phục dựng", to: "/phuc-dung" }, 
        { label: country?.name ?? countrySlug }
      ]} />
      
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">{country?.name ?? "Đang tải..."}</h1>

      {/* Phần mô tả chính */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
        <div className="prose-like text-slate-700">
          <p>{country?.description ?? "Đang tải dữ liệu..."}</p>
        </div>
        <PlaceholderImage label="Ảnh quốc gia" className="h-40 rounded-lg shadow-sm" />
      </div>

      {/* Danh sách các đơn vị (Units) */}
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {countryUnits.length > 0 ? (
          countryUnits.map((u) => (
            <Card key={u.slug} className="hover:shadow-md transition-shadow">
              <CardContent>
                <div className="font-semibold tracking-tight">
                  <Link to={`/phuc-dung/${countrySlug}/${u.slug}`} className="hover:text-brand-redDark transition-colors">
                    {u.name}
                  </Link>
                </div>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{u.description}</p>
                <div className="mt-3">
                  <Link to={`/phuc-dung/${countrySlug}/${u.slug}`} className="text-sm font-bold text-brand-redDark hover:underline">
                    Xem chi tiết →
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-slate-500 italic col-span-3">Chưa có đơn vị nào thuộc quốc gia này.</p>
        )}
      </div>

      {/* Gợi ý xem thêm quốc gia khác */}
      <div className="mt-8 pt-6 border-t border-slate-200 text-sm text-slate-600">
        <div className="font-bold text-slate-800 mb-2">KHÁM PHÁ CÁC QUỐC GIA KHÁC:</div>
        <ul className="grid grid-cols-2 gap-2">
          {countries.filter((c) => c.slug !== countrySlug).slice(0, 4).map((c) => (
            <li key={c.slug}>
              <Link className="hover:text-brand-red hover:underline flex items-center gap-2" to={`/phuc-dung/${c.slug}`}>
                <span className="w-1.5 h-1.5 bg-brand-red rounded-full"></span>
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </PageShell>
  );
}