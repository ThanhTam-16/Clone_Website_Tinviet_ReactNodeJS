import { pool } from '../../config/db.js'

export const listAdmin = async ({ q, role, status, page = 1, limit = 50 }) => {
  const where = ['1=1']
  const params = []

  if (q) {
    where.push('(full_name LIKE ? OR email LIKE ? OR phone LIKE ?)')
    params.push(`%${q}%`, `%${q}%`, `%${q}%`)
  }
  if (role) {
    where.push('role = ?')
    params.push(role)
  }
  if (status) {
    where.push('status = ?')
    params.push(status)
  }

  const offset = (Number(page) - 1) * Number(limit)

  const [rows] = await pool.query(
    `SELECT id, role, full_name, email, phone, status, last_login_at, created_at, updated_at
     FROM users
     WHERE ${where.join(' AND ')}
     ORDER BY id DESC
     LIMIT ? OFFSET ?`,
    [...params, Number(limit), Number(offset)]
  )

  const [countRows] = await pool.query(
    `SELECT COUNT(*) AS total FROM users WHERE ${where.join(' AND ')}`,
    params
  )

  return {
    items: rows,
    pagination: { page: Number(page), limit: Number(limit), total: countRows[0]?.total || 0 },
  }
}

export const findById = async (id) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE id = ? LIMIT 1`, [Number(id)])
  return rows[0]
}

export const updateById = async (id, payload) => {
  const allowed = ['role', 'full_name', 'email', 'phone', 'status']
  const sets = []
  const values = []

  for (const k of allowed) {
    if (payload[k] !== undefined) {
      sets.push(`${k} = ?`)
      values.push(payload[k])
    }
  }

  if (!sets.length) return 0

  values.push(Number(id))
  const [rs] = await pool.query(`UPDATE users SET ${sets.join(', ')} WHERE id = ?`, values)
  return rs.affectedRows
}
