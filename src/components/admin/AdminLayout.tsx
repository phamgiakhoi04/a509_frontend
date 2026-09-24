// src/components/admin/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex bg-[#f3ead2] min-h-screen font-body">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8 overflow-y-auto h-screen bg-white">
        <Outlet />
      </main>
    </div>
  );
}
