import { pool } from '../../config/db.js';

export const findAllActiveByType = async (type = 'product') => {
  const [rows] = await pool.query(
    `SELECT id, parent_id, name, slug, image_url, sort_order
     FROM categories
     WHERE type = ? AND is_active = 1
     ORDER BY sort_order ASC, id ASC`,
    [type]
  );
  return rows;
};

export const findBySlug = async (slug, type = 'product') => {
  const [rows] = await pool.query(
    `SELECT id, parent_id, name, slug
     FROM categories
     WHERE slug = ? AND type = ? AND is_active = 1
     LIMIT 1`,
    [slug, type]
  );
  return rows[0];
};

export const findDescendantIds = async (rootId) => {
  // Lấy tất cả con cháu bằng CTE (MySQL 8 OK)
  const [rows] = await pool.query(
    `WITH RECURSIVE cte AS (
       SELECT id, parent_id
       FROM categories
       WHERE id = ?
       UNION ALL
       SELECT c.id, c.parent_id
       FROM categories c
       INNER JOIN cte ON c.parent_id = cte.id
     )
     SELECT id FROM cte`,
    [rootId]
  );
  return rows.map(r => r.id);
};

export const listAdmin = async ({ q, type, isActive, page = 1, limit = 50 }) => {
  const where = ['1=1']
  const params = []

  if (q) {
    where.push('(name LIKE ? OR slug LIKE ?)')
    params.push(`%${q}%`, `%${q}%`)
  }

  if (type) {
    where.push('type = ?')
    params.push(type)
  }

  if (isActive !== undefined && isActive !== null && isActive !== '') {
    where.push('is_active = ?')
    params.push(Number(isActive) ? 1 : 0)
  }

  const offset = (Number(page) - 1) * Number(limit)

  const [rows] = await pool.query(
    `SELECT id, parent_id, type, name, slug, description, image_url, sort_order, is_active, created_at, updated_at
     FROM categories
     WHERE ${where.join(' AND ')}
     ORDER BY sort_order ASC, id DESC
     LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  )

  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total FROM categories WHERE ${where.join(' AND ')}`,
    params
  )

  return {
    items: rows,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total: countRows[0]?.total || 0,
    },
  }
}

export const findById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM categories WHERE id = ? LIMIT 1`, [Number(id)])
  return rows[0]
}

export const insert = async (payload) => {
  const {
    parent_id = null,
    type = 'product',
    name,
    slug,
    description = null,
    image_url = null,
    sort_order = 0,
    is_active = 1,
  } = payload

  const [rs] = await pool.query(
    `INSERT INTO categories (parent_id, type, name, slug, description, image_url, sort_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      parent_id != null ? Number(parent_id) : null,
      type,
      name,
      slug,
      description,
      image_url,
      Number(sort_order) || 0,
      Number(is_active) ? 1 : 0,
    ]
  )

  return rs.insertId
}

export const updateById = async (id, payload) => {
  const allowed = ['parent_id', 'type', 'name', 'slug', 'description', 'image_url', 'sort_order', 'is_active']
  const sets = []
  const values = []

  for (const k of allowed) {
    if (payload[k] !== undefined) {
      sets.push(`${k} = ?`)
      if (k === 'parent_id') values.push(payload[k] != null ? Number(payload[k]) : null)
      else if (k === 'sort_order') values.push(Number(payload[k]) || 0)
      else if (k === 'is_active') values.push(Number(payload[k]) ? 1 : 0)
      else values.push(payload[k])
    }
  }

  if (!sets.length) return 0

  values.push(Number(id))
  const [rs] = await pool.query(`UPDATE categories SET ${sets.join(', ')} WHERE id = ?`, values)
  return rs.affectedRows
}

// soft delete để tránh ảnh hưởng FK
export const deactivateById = async (id) => {
  const [rs] = await pool.query(`UPDATE categories SET is_active = 0 WHERE id = ?`, [Number(id)])
  return rs.affectedRows
}