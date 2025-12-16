import { Routes, Route } from "react-router-dom";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import RequireAdmin from "./RequireAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/*" element={<ClientRoutes />} />

      <Route element={<RequireAdmin />}>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Route>
    </Routes>
  );
}
