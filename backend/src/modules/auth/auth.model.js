import { pool } from '../../config/db.js';

export const findUserByEmailOrPhone = async (value) => {
  const [rows] = await pool.query(
    `SELECT * FROM users WHERE email = ? OR phone = ? LIMIT 1`,
    [value, value]
  );
  return rows[0];
};

export const createUser = async ({ fullName, email, phone, passwordHash }) => {
  const [result] = await pool.query(
    `INSERT INTO users (full_name, email, phone, password_hash)
     VALUES (?, ?, ?, ?)`,
    [fullName, email, phone, passwordHash]
  );
  return result.insertId;
};

export const findUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT id, full_name, email, phone, role FROM users WHERE id = ?`,
    [id]
  );
  return rows[0];
};
