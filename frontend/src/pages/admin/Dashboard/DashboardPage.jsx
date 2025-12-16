import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { adminDashboardService } from "../../../services/admin.dashboard.service";
import {
  ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar,
  PieChart, Pie, Legend,
} from "recharts";

export default function DashboardPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-dashboard-counts"],
    queryFn: () => adminDashboardService.getCounts(),
  });

  const counts = data || { products: 0, categories: 0, users: 0 };

  // Demo charts (bạn thay bằng order/revenue thật khi có orders)
  const revenueByMonth = useMemo(() => ([
    { month: "T1", revenue: 12000000 },
    { month: "T2", revenue: 18000000 },
    { month: "T3", revenue: 15000000 },
    { month: "T4", revenue: 22000000 },
    { month: "T5", revenue: 26000000 },
    { month: "T6", revenue: 24000000 },
  ]), []);

  const visitsByDay = useMemo(() => ([
    { day: "Mon", visits: 1200 },
    { day: "Tue", visits: 1400 },
    { day: "Wed", visits: 900 },
    { day: "Thu", visits: 1600 },
    { day: "Fri", visits: 2100 },
    { day: "Sat", visits: 1800 },
    { day: "Sun", visits: 1300 },
  ]), []);

  const distribution = useMemo(() => ([
    { name: "Sản phẩm", value: counts.products },
    { name: "Danh mục", value: counts.categories },
    { name: "Khách hàng", value: counts.users },
  ]), [counts]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-bold">Dashboard</h1>
        <div className="text-sm text-slate-600">{isLoading ? "Đang tải..." : "Tổng quan hệ thống"}</div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-4">
        <StatCard title="Sản phẩm" value={counts.products} />
        <StatCard title="Danh mục" value={counts.categories} />
        <StatCard title="Khách hàng" value={counts.users} />
        <StatCard title="Đơn hàng" value="—" note="Chưa triển khai" />
      </div>

      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        <div className="rounded-lg border bg-white p-4 lg:col-span-2">
          <div className="mb-2 text-sm font-semibold">Doanh thu theo tháng (demo)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueByMonth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4">
          <div className="mb-2 text-sm font-semibold">Phân bổ dữ liệu</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-lg border bg-white p-4 lg:col-span-3">
          <div className="mb-2 text-sm font-semibold">Lượt truy cập theo ngày (demo)</div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitsByDay}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="visits" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <div className="text-sm font-semibold">Ghi chú</div>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-700 space-y-1">
          <li>Biểu đồ doanh thu/visit đang là demo. Khi có Orders, mình sẽ map dữ liệu thật theo ngày/tháng.</li>
          <li>Hiện Dashboard đã lấy số liệu thật: products/categories/users.</li>
        </ul>
      </div>
    </div>
  );
}

function StatCard({ title, value, note }) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
      {note ? <div className="mt-1 text-xs text-slate-500">{note}</div> : null}
    </div>
  );
}
