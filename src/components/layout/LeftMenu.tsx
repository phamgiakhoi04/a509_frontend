import { Link } from "react-router-dom";
import type { Country, Unit, EquipmentCategory } from "@/types/models";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";

type Props = {
  countries: Country[];
  units: Unit[];
  categories: EquipmentCategory[];
};

export default function LeftMenu({ countries, units, categories }: Props) {
  return (
    <Card>
      <CardHeader>
        <div className="font-semibold">Danh mục</div>
      </CardHeader>
      <CardContent>
        <div className="space-y-5 text-sm">
          <div>
            <div className="font-medium text-slate-700">Phục dựng</div>
            <ul className="mt-2 space-y-1">
              {countries.map((c) => (
                <li key={c.slug}>
                  <Link to={`/phuc-dung/${c.slug}`} className="hover:underline">{c.name}</Link>
                  <ul className="ml-4 mt-1 space-y-1 text-slate-600">
                    {units.filter((u) => u.countrySlug === c.slug).slice(0, 4).map((u) => (
                      <li key={u.slug}>
                        <Link to={`/phuc-dung/${c.slug}/${u.slug}`} className="hover:underline">{u.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-medium text-slate-700">Quân trang</div>
            <ul className="mt-2 space-y-1">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link to={`/quan-trang/${cat.slug}`} className="hover:underline">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
