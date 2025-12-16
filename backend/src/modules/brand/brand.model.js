import { pool } from '../../config/db.js';

export const findAllActive = async () => {
  const [rows] = await pool.query(
    `SELECT id, name, slug, logo_url
     FROM brands
     WHERE is_active = 1
     ORDER BY name ASC`
  );
  return rows;
};

export const findBySlug = async (slug) => {
  const [rows] = await pool.query(
    `SELECT id, name, slug
     FROM brands
     WHERE slug = ? AND is_active = 1
     LIMIT 1`,
    [slug]
  );
  return rows[0];
};
