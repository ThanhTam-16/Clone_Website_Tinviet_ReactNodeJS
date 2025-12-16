import { pool } from '../../config/db.js';

export const findList = async ({
  q,
  categoryIds,
  brandId,
  minPrice,
  maxPrice,
  sort = 'newest',
  page = 1,
  limit = 20
}) => {
  const where = [`p.status = 'published'`];
  const params = [];

  if (q) {
    where.push(`(p.name LIKE ? OR p.short_desc LIKE ?)`);
    params.push(`%${q}%`, `%${q}%`);
  }

  if (categoryIds && categoryIds.length) {
    where.push(`p.category_id IN (${categoryIds.map(() => '?').join(',')})`);
    params.push(...categoryIds);
  }

  if (brandId) {
    where.push(`p.brand_id = ?`);
    params.push(brandId);
  }

  if (minPrice != null) {
    where.push(`p.price >= ?`);
    params.push(minPrice);
  }

  if (maxPrice != null) {
    where.push(`p.price <= ?`);
    params.push(maxPrice);
  }

  let orderBy = `p.created_at DESC`;
  if (sort === 'price_asc') orderBy = `p.price ASC`;
  if (sort === 'price_desc') orderBy = `p.price DESC`;
  if (sort === 'name_asc') orderBy = `p.name ASC`;

  const offset = (Number(page) - 1) * Number(limit);

  const sql = `
    SELECT
      p.id, p.name, p.slug, p.price, p.compare_at_price, p.featured_image_url,
      p.category_id, p.brand_id
    FROM products p
    WHERE ${where.join(' AND ')}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;

  const [rows] = await pool.query(sql, [...params, Number(limit), Number(offset)]);
  return rows;
};

export const countList = async ({
  q,
  categoryIds,
  brandId,
  minPrice,
  maxPrice
}) => {
  const where = [`p.status = 'published'`];
  const params = [];

  if (q) {
    where.push(`(p.name LIKE ? OR p.short_desc LIKE ?)`);
    params.push(`%${q}%`, `%${q}%`);
  }

  if (categoryIds && categoryIds.length) {
    where.push(`p.category_id IN (${categoryIds.map(() => '?').join(',')})`);
    params.push(...categoryIds);
  }

  if (brandId) {
    where.push(`p.brand_id = ?`);
    params.push(brandId);
  }

  if (minPrice != null) {
    where.push(`p.price >= ?`);
    params.push(minPrice);
  }

  if (maxPrice != null) {
    where.push(`p.price <= ?`);
    params.push(maxPrice);
  }

  const [rows] = await pool.query(
    `SELECT COUNT(*) AS total
     FROM products p
     WHERE ${where.join(' AND ')}`,
    params
  );
  return rows[0]?.total || 0;
};

export const findBySlug = async (slug) => {
  const [rows] = await pool.query(
    `SELECT * FROM products WHERE slug = ? AND status='published' LIMIT 1`,
    [slug]
  );
  return rows[0];
};

export const findImagesByProductId = async (productId) => {
  const [rows] = await pool.query(
    `SELECT image_url, alt_text, sort_order
     FROM product_images
     WHERE product_id = ?
     ORDER BY sort_order ASC, id ASC`,
    [productId]
  );
  return rows;
};

export const findAttributesByProductId = async (productId) => {
  const [rows] = await pool.query(
    `SELECT a.name, pav.value
     FROM product_attribute_values pav
     JOIN attributes a ON a.id = pav.attribute_id
     WHERE pav.product_id = ?
     ORDER BY a.id ASC`,
    [productId]
  );
  return rows;
};

export const findRelatedProducts = async (categoryId, excludeId) => {
  const [rows] = await pool.query(
    `SELECT id, name, slug, price, compare_at_price, featured_image_url
     FROM products
     WHERE category_id = ?
       AND id <> ?
       AND status = 'published'
     ORDER BY created_at DESC
     LIMIT 8`,
    [categoryId, excludeId]
  );
  return rows;
};

export const suggestSearch = async (q) => {
  const [rows] = await pool.query(
    `SELECT id, name, slug
     FROM products
     WHERE status='published'
       AND name LIKE ?
     ORDER BY view_count DESC
     LIMIT 8`,
    [`%${q}%`]
  );
  return rows;
};

export const findById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM products WHERE id = ? LIMIT 1`, [id])
  return rows[0]
}

export const insertProduct = async (payload) => {
  const {
    product_type = 'sell',
    category_id,
    brand_id = null,
    name,
    slug,
    sku = null,
    short_desc = null,
    description = null,
    featured_image_url = null,
    price = 0,
    compare_at_price = null,
    cost_price = null,
    is_featured = 0,
    status = 'published',
  } = payload

  const [rs] = await pool.query(
    `INSERT INTO products
    (product_type, category_id, brand_id, name, slug, sku, short_desc, description, featured_image_url,
     price, compare_at_price, cost_price, is_featured, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      product_type,
      Number(category_id),
      brand_id != null ? Number(brand_id) : null,
      name,
      slug,
      sku,
      short_desc,
      description,
      featured_image_url,
      Number(price),
      compare_at_price != null ? Number(compare_at_price) : null,
      cost_price != null ? Number(cost_price) : null,
      Number(is_featured) ? 1 : 0,
      status,
    ]
  )
  return rs.insertId
}

export const updateById = async (id, payload) => {
  const allowed = [
    'product_type',
    'category_id',
    'brand_id',
    'name',
    'slug',
    'sku',
    'short_desc',
    'description',
    'featured_image_url',
    'price',
    'compare_at_price',
    'cost_price',
    'is_featured',
    'status',
  ]

  const sets = []
  const values = []

  for (const k of allowed) {
    if (payload[k] !== undefined) {
      sets.push(`${k} = ?`)
      if (['category_id', 'brand_id'].includes(k)) {
        values.push(payload[k] != null ? Number(payload[k]) : null)
      } else if (['price', 'compare_at_price', 'cost_price'].includes(k)) {
        values.push(payload[k] != null ? Number(payload[k]) : null)
      } else if (k === 'is_featured') {
        values.push(Number(payload[k]) ? 1 : 0)
      } else {
        values.push(payload[k])
      }
    }
  }

  if (!sets.length) return 0

  values.push(Number(id))
  const [rs] = await pool.query(
    `UPDATE products SET ${sets.join(', ')} WHERE id = ?`,
    values
  )
  return rs.affectedRows
}

// "Delete" an toàn: archive (tránh lỗi FK order_items)
export const archiveById = async (id) => {
  const [rs] = await pool.query(
    `UPDATE products SET status = 'archived' WHERE id = ?`,
    [Number(id)]
  )
  return rs.affectedRows
}
