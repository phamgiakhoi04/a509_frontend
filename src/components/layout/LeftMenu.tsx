// src/components/layout/LeftMenu.tsx
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
        <div className="space-y-6 text-sm">
          <div>
            <div className="font-medium text-slate-800 mb-2">Phục dựng</div>
            <ul className="space-y-2">
              {countries.map((c) => (
                <li key={c.id}>
                  <Link
                    to={`/phuc-dung/${c.slug}`}
                    className="text-slate-700 hover:text-brand-red hover:underline flex items-center gap-2"
                  >
                    {c.flagImageUrl && (
                      <img
                        src={c.flagImageUrl}
                        alt={c.name}
                        className="w-6 h-4 object-cover rounded-sm inline-block"
                      />
                    )}
                    {c.name}
                  </Link>

                  <ul className="ml-6 mt-1 space-y-1 text-slate-600 text-xs">
                    {units
                      .filter((u) => u.countrySlug === c.slug)
                      .slice(0, 4)
                      .map((u) => (
                        <li key={u.slug}>
                          <Link to={`/phuc-dung/${c.slug}/${u.slug}`} className="hover:underline">
                            {u.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="font-medium text-slate-800 mb-2">Quân trang</div>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/quan-trang/${cat.slug}`}
                    className="text-slate-700 hover:text-brand-red hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}