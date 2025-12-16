import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { adminProductService } from "../../../services/admin.product.service";
import { FiEdit2, FiPlus, FiTrash2 } from "react-icons/fi";

export default function ProductListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await adminProductService.list({ page: 1, limit: 100, q });
      const list = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      setItems(list);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDelete = async (p) => {
    const ok = confirm(`Xoá sản phẩm: ${p.name}?`);
    if (!ok) return;
    await adminProductService.remove(p.id);
    await load();
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Quản lý sản phẩm</h1>

        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Tìm theo tên..."
            className="w-56 rounded-md border px-3 py-2 text-sm"
          />
          <button
            onClick={load}
            className="rounded-md border bg-white px-3 py-2 text-sm hover:bg-slate-50"
          >
            Tìm
          </button>

          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:opacity-90"
          >
            <FiPlus /> Thêm mới
          </Link>
        </div>
      </div>

      <div className="mt-4 overflow-auto rounded-lg border">
        <table className="min-w-[900px] w-full text-sm">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-3 py-2 text-left">ID</th>
              <th className="px-3 py-2 text-left">Tên</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-right">Giá</th>
              <th className="px-3 py-2 text-right">Danh mục</th>
              <th className="px-3 py-2 text-right">Brand</th>
              <th className="px-3 py-2 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-6 text-center text-slate-500" colSpan={7}>
                  Đang tải...
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-center text-slate-500" colSpan={7}>
                  Không có sản phẩm
                </td>
              </tr>
            ) : (
              items.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="px-3 py-2">{p.id}</td>
                  <td className="px-3 py-2">
                    <div className="flex items-center gap-2">
                      <img
                        src={p.featured_image_url}
                        alt={p.name}
                        className="h-10 w-10 rounded object-cover"
                        onError={(e) => (e.currentTarget.style.display = "none")}
                      />
                      <span className="line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-2">{p.slug}</td>
                  <td className="px-3 py-2 text-right">
                    {Number(p.price || 0).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-3 py-2 text-right">{p.category_id}</td>
                  <td className="px-3 py-2 text-right">{p.brand_id}</td>
                  <td className="px-3 py-2">
                    <div className="flex justify-end gap-2">
                      <Link
                        to={`/admin/products/${p.id}/${p.slug}/edit`}
                        className="inline-flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-slate-50"
                      >
                        <FiEdit2 /> Sửa
                      </Link>
                      <button
                        onClick={() => onDelete(p)}
                        className="inline-flex items-center gap-1 rounded-md border px-2 py-1 hover:bg-slate-50"
                      >
                        <FiTrash2 /> Xoá
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
