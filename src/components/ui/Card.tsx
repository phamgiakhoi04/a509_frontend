import type { PropsWithChildren } from "react";

export default function Card({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  return <div className={`rounded-2xl bg-white shadow-soft ring-1 ring-slate-200 ${className}`}>{children}</div>;
}

export function CardHeader({ children }: PropsWithChildren) {
  return <div className="p-4 border-b border-slate-100">{children}</div>;
}

export function CardContent({ children }: PropsWithChildren) {
  return <div className="p-4">{children}</div>;
}
