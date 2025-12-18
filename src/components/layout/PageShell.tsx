import type { PropsWithChildren } from "react";
import RightSidebar from "@/components/layout/RightSidebar";

export default function PageShell({
  children,
  right,
}: PropsWithChildren<{ right: { title: string; to: string; date: string }[] }>) {
  return (
    <div className="container-page py-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>{children}</div>
        <div className="lg:sticky lg:top-24 h-fit">
          <RightSidebar recent={right.map((r) => ({ kind: "bai-viet", ...r }))} />
        </div>
      </div>
    </div>
  );
}
