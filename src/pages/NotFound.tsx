import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-page py-16">
      <h1 className="text-3xl font-semibold tracking-tight">404</h1>
      <p className="mt-2 text-sm text-slate-600">Trang không tồn tại.</p>
      <div className="mt-6">
        <Link to="/" className="text-sm font-medium hover:underline">
          ← Về trang chủ
        </Link>
      </div>
    </div>
  );
}
