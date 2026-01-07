import { Navigate, Outlet } from "react-router-dom";
import { authApi } from "@/api/authApi";

export default function ProtectedRoute() {
  const user = authApi.getCurrentUser();

  const hasAdminRoleInArray = user?.roles?.some((r: { name: string }) => 
    r.name === "ADMIN" || r.name === "ROLE_ADMIN"
  );

  const hasAdminRoleName = user?.roleName === "ADMIN" || user?.roleName === "ROLE_ADMIN";

  const isAdmin = user && (hasAdminRoleInArray || hasAdminRoleName);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}