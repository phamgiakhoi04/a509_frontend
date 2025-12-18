import { Link } from "react-router-dom";
import Card, { CardContent } from "@/components/ui/Card";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-page py-10 grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent>
            <div className="font-semibold">Lame stuff</div>
            <p className="mt-2 text-sm text-slate-700">
              Placeholder: thêm mô tả dự án, quy định an toàn, quy trình tham gia, v.v.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="font-semibold">Liên hệ</div>
            <ul className="mt-2 text-sm text-slate-700 space-y-1">
              <li>Email: xxxxxxxxxx</li>
              <li>Facebook: xxxxxxxxxx</li>
              <li>Twitter: xxxxxxxxxx</li>
              <li>Youtube: xxxxxxxxxx</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="font-semibold">Điều hướng</div>
            <ul className="mt-2 text-sm text-slate-700 space-y-1">
              <li><Link className="hover:underline" to="/gioi-thieu">Giới thiệu</Link></li>
              <li><Link className="hover:underline" to="/phuc-dung">Phục dựng</Link></li>
              <li><Link className="hover:underline" to="/quan-trang">Quân trang</Link></li>
              <li><Link className="hover:underline" to="/tai-lieu">Tài liệu</Link></li>
              <li><Link className="hover:underline" to="/tin-tuc">Tin tức</Link></li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="container-page pb-10 text-xs text-slate-500">
        © {new Date().getFullYear()} A509 (placeholder)
      </div>
    </footer>
  );
}
