export default function PlaceholderImage({ label = "Ảnh", className = "" }: { label?: string; className?: string }) {
  return (
    <div className={`rounded-2xl bg-slate-100 ring-1 ring-slate-200 flex items-center justify-center ${className}`}>
      <div className="text-slate-500 text-sm">[{label}]</div>
    </div>
  );
}
