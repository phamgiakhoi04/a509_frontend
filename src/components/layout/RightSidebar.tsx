import { Link } from "react-router-dom";
import type { PeriodArticle, Post } from "@/types/models";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import { formatDateTime } from "@/utils/format";

type Props = {
  recent: { kind: "bai-viet"; title: string; to: string; date: string }[];
};

export default function RightSidebar({ recent }: Props) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="font-semibold">Quảng cáo</div>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-600">
            Khu vực quảng cáo (placeholder)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="font-semibold">Bài viết gần đây</div>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {recent.slice(0, 6).map((r) => (
              <li key={r.to} className="text-sm">
                <Link to={r.to} className="font-medium hover:underline">{r.title}</Link>
                <div className="text-xs text-slate-500">{formatDateTime(r.date)}</div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
