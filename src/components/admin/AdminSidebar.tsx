// src/components/admin/AdminSidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Shirt, FileText, Users, LogOut } from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname.startsWith(path);

  const menuItems = [
    { path: "/admin/dashboard", label: "Tổng quan", icon: LayoutDashboard },
    { path: "/admin/uniforms", label: "Quản lý Quân trang", icon: Shirt },
    { path: "/admin/posts", label: "Tin tức & Tài liệu", icon: FileText },
    { path: "/admin/users", label: "Người dùng", icon: Users },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0 z-50">
      <div className="h-16 flex items-center justify-center border-b border-slate-700">
        <span className="font-black text-2xl text-brand-yellow">A509 ADMIN</span>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-bold ${
              isActive(item.path) 
                ? "bg-brand-redDark text-white" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
           <LogOut size={16} /> Về trang chủ
        </Link>
      </div>
    </aside>
  );
}