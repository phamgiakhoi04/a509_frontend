// src/components/admin/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Shirt, FileText, LayoutList, Newspaper, Users, LogOut, Home } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const adminMenuItems = [
    { path: "/admin/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/admin/phuc-dung", label: "Quản lý Phục Dựng", icon: LayoutList },
    { path: "/admin/quan-trang", label: "Quản lý Quân trang", icon: Shirt },
    { path: "/admin/tai-lieu", label: "Quản lý Tài liệu", icon: FileText },
    { path: "/admin/tin-tuc", label: "Quản lý Tin tức", icon: Newspaper },
    { path: "/admin/users", label: "Quản lý Người dùng", icon: Users },
  ];

  return (
    <aside className="w-64 bg-brand-redDark text-white min-h-screen flex flex-col fixed left-0 top-0 z-50 shadow-2xl">
      <Link 
        to="/admin/dashboard"
        className="h-16 flex items-center justify-center border-b border-brand-red hover:bg-brand-red/20 transition-colors"
      >
        <div className="h-12 w-12 rounded-full bg-brand-bg border-4 border-brand-yellow overflow-hidden flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
          <img
            src="/images/A509 Logo.png"
            alt="A509 Logo"
            className="w-10 h-10 object-cover"
          />
        </div>
      </Link>
      
      <nav className="flex-1 p-4 space-y-1">
        {adminMenuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-base whitespace-nowrap ${
              isActive(item.path)
                ? "bg-brand-yellow text-brand-redDark shadow-pop-hover"
                : "text-white/90 hover:bg-brand-red hover:text-brand-yellow hover:shadow-pop"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-brand-red">
        <Link 
          to="/"
          className="flex items-center gap-2 text-white/80 hover:text-brand-yellow transition-colors font-medium"
        >
          <Home size={18} /> Về trang chủ
        </Link>
      </div>
    </aside>
  );
}