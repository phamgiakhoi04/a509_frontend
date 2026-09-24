import type { PropsWithChildren } from "react";
import RightSidebar from "@/components/layout/RightSidebar";

export default function PageShell({
  children,
  right,
}: PropsWithChildren<{
  right: {
    title: string;
    to: string;
    date: string;
  }[];
}>) {
  return (
    <div className="px-5 py-4">
      {/* NOTE:
          2 cột:
          - Main: phần nội dung chính
          - Sidebar: cột phải
          
          1fr + 240px gần với layout trong ảnh mẫu.
      */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_240px]">
        {/* MAIN */}
        <section className="min-w-0">
          {children}
        </section>

        {/* SIDEBAR */}
        <aside className="h-fit">
          <RightSidebar
            recent={right.map((item) => ({
              kind: "bai-viet",
              ...item,
            }))}
          />
        </aside>
      </div>
    </div>
  );
}