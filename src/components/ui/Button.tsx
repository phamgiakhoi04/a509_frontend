// src/components/ui/Button.tsx
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "solid" | "ghost" | "outline" };

export default function Button({ variant = "solid", className = "", ...props }: Props) {
  // Thêm hiệu ứng ấn xuống (active:translate-y-1)
  const base =
    "inline-flex items-center justify-center transition-all transform active:scale-95 active:translate-y-1 " +
    "focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";
  
  // Style mặc định sẽ là bo tròn, font đậm
  return <button className={`${base} ${className}`} {...props} />;
}