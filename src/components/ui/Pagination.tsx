type Props = {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export default function Pagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-6 flex items-center justify-center gap-2 text-sm">
      <button
        className="rounded-xl px-3 py-2 hover:bg-slate-100 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onChange(1)}
      >
        «
      </button>
      <button
        className="rounded-xl px-3 py-2 hover:bg-slate-100 disabled:opacity-50"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        ‹
      </button>

      <span className="text-slate-500">{"<"}</span>
      {pages.map((p) => (
        <button
          key={p}
          className={[
            "rounded-xl px-3 py-2",
            p === page ? "bg-slate-900 text-white" : "hover:bg-slate-100",
          ].join(" ")}
          onClick={() => onChange(p)}
        >
          {p}
        </button>
      ))}
      <span className="text-slate-500">{">"}</span>

      <button
        className="rounded-xl px-3 py-2 hover:bg-slate-100 disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        ›
      </button>
      <button
        className="rounded-xl px-3 py-2 hover:bg-slate-100 disabled:opacity-50"
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
      >
        »
      </button>
    </div>
  );
}
