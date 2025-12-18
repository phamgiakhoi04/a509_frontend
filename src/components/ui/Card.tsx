import type { PropsWithChildren } from "react";

export default function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`rounded-3xl bg-brand-surface shadow-card border border-white/50 hover:shadow-lg transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children }: PropsWithChildren) {
  return (
    <div className="px-6 py-4 border-b border-brand-bg flex items-center justify-between">
      {/* Tự động style cho tiêu đề trong Header đậm và đỏ */}
      <div className="text-lg font-bold text-brand-red tracking-tight w-full">
        {children}
      </div>
    </div>
  );
}

export function CardContent({ children }: PropsWithChildren) {
  return <div className="p-6">{children}</div>;
}