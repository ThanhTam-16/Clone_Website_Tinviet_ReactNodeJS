import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { adminProductService } from "../../../services/admin.product.service";
import { productService } from "../../../services/product.service";

const toSlug = (s = "") =>
  s
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ProductFormPage({ mode = "create" }) {
  const nav = useNavigate();
  const { id, slug } = useParams();

  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    product_type: "sell",
    category_id: "",
    brand_id: "",
    name: "",
    slug: "",
    sku: "",
    short_desc: "",
    description: "",
    featured_image_url: "",
    price: "",
    compare_at_price: "",
    is_featured: 0,
    status: "published",
  });

  const canAutoSlug = useMemo(() => !isEdit, [isEdit]);

  const loadDetail = async () => {
    if (!isEdit) return;
    setLoading(true);
    try {
      // edit: dùng slug để lấy detail (public GET /products/:slug)
      const data = await productService.getBySlug(slug);
      setForm((prev) => ({
        ...prev,
        product_type: data.product_type || "sell",
        category_id: data.category_id ?? "",
        brand_id: data.brand_id ?? "",
        name: data.name || "",
        slug: data.slug || "",
        sku: data.sku || "",
        short_desc: data.short_desc || "",
        description: data.description || "",
        featured_image_url: data.featured_image_url || "",
        price: data.price ?? "",
        compare_at_price: data.compare_at_price ?? "",
        is_featured: data.is_featured ? 1 : 0,
        status: data.status || "published",
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, slug]);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        category_id: Number(form.category_id) || null,
        brand_id: Number(form.brand_id) || null,
        price: Number(form.price) || 0,
        compare_at_price: form.compare_at_price === "" ? null : Number(form.compare_at_price),
        is_featured: Number(form.is_featured) ? 1 : 0,
      };

      if (isEdit) {
        await adminProductService.update(id, payload);
      } else {
        await adminProductService.create(payload);
      }

      nav("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {isEdit ? "Sửa sản phẩm" : "Thêm sản phẩm"}
        </h1>
        <button
          onClick={() => nav(-1)}
          className="rounded-md border px-3 py-2 text-sm hover:bg-slate-50"
        >
          Quay lại
        </button>
      </div>

      <form onSubmit={onSubmit} className="mt-4 grid grid-cols-12 gap-3">
        <div className="col-span-12 lg:col-span-8">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-12 gap-3">
              <label className="col-span-12">
                <div className="mb-1 text-sm font-medium">Tên</div>
                <input
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setField("name", name);
                    if (canAutoSlug) setField("slug", toSlug(name));
                  }}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  required
                />
              </label>

              <label className="col-span-12 md:col-span-8">
                <div className="mb-1 text-sm font-medium">Slug</div>
                <input
                  value={form.slug}
                  onChange={(e) => setField("slug", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  required
                />
              </label>

              <label className="col-span-12 md:col-span-4">
                <div className="mb-1 text-sm font-medium">SKU</div>
                <input
                  value={form.sku}
                  onChange={(e) => setField("sku", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
              </label>

              <label className="col-span-12">
                <div className="mb-1 text-sm font-medium">Mô tả ngắn</div>
                <input
                  value={form.short_desc}
                  onChange={(e) => setField("short_desc", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
              </label>

              <label className="col-span-12">
                <div className="mb-1 text-sm font-medium">Mô tả chi tiết</div>
                <textarea
                  value={form.description}
                  onChange={(e) => setField("description", e.target.value)}
                  className="h-40 w-full rounded-md border px-3 py-2 text-sm"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-12 gap-3">
              <label className="col-span-12">
                <div className="mb-1 text-sm font-medium">Ảnh đại diện (URL)</div>
                <input
                  value={form.featured_image_url}
                  onChange={(e) => setField("featured_image_url", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
                {form.featured_image_url ? (
                  <img
                    src={form.featured_image_url}
                    alt="preview"
                    className="mt-2 h-40 w-full rounded object-cover"
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                ) : null}
              </label>

              <label className="col-span-6">
                <div className="mb-1 text-sm font-medium">Giá</div>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setField("price", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  required
                />
              </label>

              <label className="col-span-6">
                <div className="mb-1 text-sm font-medium">Giá gốc</div>
                <input
                  type="number"
                  value={form.compare_at_price}
                  onChange={(e) => setField("compare_at_price", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
              </label>

              <label className="col-span-6">
                <div className="mb-1 text-sm font-medium">Category ID</div>
                <input
                  type="number"
                  value={form.category_id}
                  onChange={(e) => setField("category_id", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                  required
                />
              </label>

              <label className="col-span-6">
                <div className="mb-1 text-sm font-medium">Brand ID</div>
                <input
                  type="number"
                  value={form.brand_id}
                  onChange={(e) => setField("brand_id", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                />
              </label>

              <label className="col-span-6">
                <div className="mb-1 text-sm font-medium">Nổi bật</div>
                <select
                  value={form.is_featured}
                  onChange={(e) => setField("is_featured", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value={0}>Không</option>
                  <option value={1}>Có</option>
                </select>
              </label>

              <label className="col-span-6">
                <div className="mb-1 text-sm font-medium">Trạng thái</div>
                <select
                  value={form.status}
                  onChange={(e) => setField("status", e.target.value)}
                  className="w-full rounded-md border px-3 py-2 text-sm"
                >
                  <option value="published">published</option>
                  <option value="draft">draft</option>
                </select>
              </label>

              <button
                disabled={loading}
                className="col-span-12 mt-2 rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:opacity-90 disabled:opacity-60"
              >
                {loading ? "Đang lưu..." : isEdit ? "Cập nhật" : "Tạo mới"}
              </button>

              {isEdit ? (
                <div className="col-span-12 text-xs text-slate-500">
                  ID: {id} — Slug: {slug}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
