import { useMemo, useState } from "react";
import Card, { CardContent, CardHeader } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import PlaceholderImage from "@/components/PlaceholderImage";

const slides = [
  { id: "s1", title: "Ảnh hoạt động nội bộ của A509 (1)" },
  { id: "s2", title: "Ảnh hoạt động nội bộ của A509 (2)" },
  { id: "s3", title: "Ảnh hoạt động nội bộ của A509 (3)" },
];

export default function HomeCarousel() {
  const [idx, setIdx] = useState(0);
  const cur = useMemo(() => slides[idx], [idx]);

  return (
    <Card>
      <CardHeader>
        <div className="font-semibold">Hoạt động</div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" onClick={() => setIdx((p) => (p - 1 + slides.length) % slides.length)}>
            ‹
          </Button>
          <div className="flex-1">
            <PlaceholderImage label={cur.title} className="h-56" />
            <div className="mt-2 text-xs text-slate-500 text-center">{cur.title}</div>
          </div>
          <Button variant="ghost" onClick={() => setIdx((p) => (p + 1) % slides.length)}>
            ›
          </Button>
        </div>
        <div className="mt-3 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={["h-2 w-2 rounded-full", i === idx ? "bg-slate-900" : "bg-slate-300"].join(" ")}
              onClick={() => setIdx(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
