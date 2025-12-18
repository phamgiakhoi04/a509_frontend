import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" };

export default function Button({ variant = "solid", className = "", ...props }: Props) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition " +
    "focus:outline-none focus:ring-2 focus:ring-slate-300 disabled:opacity-50 disabled:cursor-not-allowed";
  const style = variant === "solid" ? "bg-slate-900 text-white hover:bg-slate-800" : "hover:bg-slate-100";
  return <button className={`${base} ${style} ${className}`} {...props} />;
}
