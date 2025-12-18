import { Link } from "react-router-dom";

export type Crumb = { label: string; to?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <div className="text-xs text-slate-500">
      {items.map((c, idx) => (
        <span key={idx}>
          {idx > 0 ? " / " : ""}
          {c.to ? <Link to={c.to} className="hover:underline">{c.label}</Link> : <span>{c.label}</span>}
        </span>
      ))}
    </div>
  );
}
