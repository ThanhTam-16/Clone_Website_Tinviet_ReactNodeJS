import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

export default function RequireAdmin() {
  const user = useAuthStore((s) => s.user);

  // chưa login
  if (!user) return <Navigate to="/" replace />;

  // login nhưng không phải admin
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
