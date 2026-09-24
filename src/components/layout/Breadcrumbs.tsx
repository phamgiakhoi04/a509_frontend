import { Link } from "react-router-dom";

export type Crumb = {
  label: string;
  to?: string;
};

export default function Breadcrumbs({
  items,
}: {
  items: Crumb[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-3 text-xs text-[#777]"
    >
      {items.map((crumb, index) => (
        <span key={`${crumb.label}-${index}`}>
          {/* NOTE: dấu phân cách */}
          {index > 0 && (
            <span className="mx-1 text-[#aaa]">/</span>
          )}

          {crumb.to ? (
            <Link
              to={crumb.to}
              className="hover:text-[#a92323] hover:underline"
            >
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[#555]">
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}